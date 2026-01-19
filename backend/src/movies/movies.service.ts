import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  private calculateAverageRating(reviews: any[]): number {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
    return sum / reviews.length;
  }

  async findAll() {
    const movies = await this.moviesRepository.find({
      relations: ['genres', 'reviews'],
      order: {
        movie_id: 'ASC', 
      },
    });

    // คำนวณคะแนนเฉลี่ยสำหรับแต่ละหนัง
    return movies.map(movie => ({
      ...movie,
      averageRating: this.calculateAverageRating(movie.reviews),
    }));
  }

  async findOne(id: number) {
    const movie = await this.moviesRepository.findOne({
      where: { movie_id: id },
      relations: ['reviews', 'reviews.user', 'genres'],
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    // เพิ่มคะแนนเฉลี่ย
    return {
      ...movie,
      averageRating: this.calculateAverageRating(movie.reviews),
    };
  }

  async getFeaturedMovie() {
    // ดึงหนังทั้งหมดพร้อมรีวิว
    const movies = await this.moviesRepository.find({
      relations: ['genres', 'reviews'],
    });
    
    // คำนวณคะแนนเฉลี่ยและเรียงลำดับ
    const moviesWithRatings = movies.map(movie => ({
      ...movie,
      averageRating: this.calculateAverageRating(movie.reviews),
    }));

    // เรียงตามคะแนนเฉลี่ยจากมากไปน้อย
    moviesWithRatings.sort((a, b) => b.averageRating - a.averageRating);
    
    // ส่งคืนหนังที่มีคะแนนสูงสุด
    return moviesWithRatings[0] || null;
  }

  async findByGenre(genreId: number) {
    const movies = await this.moviesRepository.find({
      where: { 
        genres: { id: genreId } 
      } as any,
      relations: ['genres', 'reviews'],
    });

    // คำนวณคะแนนเฉลี่ยและเรียงลำดับ
    const moviesWithRatings = movies.map(movie => ({
      ...movie,
      averageRating: this.calculateAverageRating(movie.reviews),
    }));

    // เรียงตามคะแนนเฉลี่ยจากมากไปน้อย
    moviesWithRatings.sort((a, b) => b.averageRating - a.averageRating);

    return moviesWithRatings;
  }

  create(data: CreateMovieDto) {
    // แยก genreIds ออกมา (เพราะ TypeORM ไม่รู้จัก field นี้ตรงๆ)
    const { genreIds, ...movieData } = data;

    // แปลง Array ตัวเลข [1, 2] ให้เป็น Array Object [{id:1}, {id:2}]
    const genres = genreIds ? genreIds.map((id) => ({ id })) : [];

    // สร้าง Entity หนังใหม่ พร้อมแนบความสัมพันธ์ genres
    const newMovie = this.moviesRepository.create({
      ...movieData,
      genres: genres, 
    });

    // บันทึกลงฐานข้อมูล
    return this.moviesRepository.save(newMovie);
  }

  async update(id: number, data: any) {
    const movie = await this.findOne(id);

    if (!data || Object.keys(data).length === 0) {
      return movie;
    }

    const updatedMovie = this.moviesRepository.merge(movie, data);
  
    return this.moviesRepository.save(updatedMovie);
  }

  async remove(id: number) {
    const movie = await this.findOne(id);
    await this.moviesRepository.delete({ movie_id: id });
    return { message: `Movie with ID ${id} deleted successfully` };
  }
}