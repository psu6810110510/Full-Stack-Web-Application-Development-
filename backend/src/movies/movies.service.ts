import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  findAll() {
    return this.moviesRepository.find({
      relations: ['genres'],
      order: {
        movie_id: 'ASC', 
      },
    }); // 👈 ปิดวงเล็บจริงๆ ตรงนี้ทีเดียวจบ
  }

  async findOne(id: number) {
    const movie = await this.moviesRepository.findOne({
      where: { movie_id: id }, // ใช้ movie_id ตาม Entity ของคุณ
      relations: ['reviews', 'reviews.user', 'genres'],
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }
  async getFeaturedMovie() {
    // ใช้ .find() แทน แล้วสั่ง take: 1 (ขอแค่ 1 เรื่อง)
    const movies = await this.moviesRepository.find({
      relations: ['genres'],
      order: { rating: 'DESC' },
      take: 1, 
    });
    
    // ส่งคืนตัวแรกที่เจอ (หรือ null ถ้าไม่มีหนังเลย)
    return movies[0]; 
  }
  async findByGenre(genreId: number) {
    return this.moviesRepository.find({
      where: { 
        genres: { id: genreId } 
      } as any, // ใช้ casting เล็กน้อยเพื่อให้ TypeORM เข้าใจ relation query
      relations: ['genres'],
      order: { rating: 'DESC' }
    });
  }

  create(data: any) {
    return this.moviesRepository.save(data);
  }

  async update(id: number, data: any) {
  const movie = await this.findOne(id);

    if (!data || Object.keys(data).length === 0) {
      return movie;
    }

    const updatedMovie = this.moviesRepository.merge(movie, data);
    return this.moviesRepository.save(updatedMovie);
  }

  // 🔴 ลบหนัง (Admin)

  async remove(id: number) {
    const movie = await this.findOne(id);
    await this.moviesRepository.delete({ movie_id: id });
    return { message: `Movie with ID ${id} deleted successfully` };
  }
}