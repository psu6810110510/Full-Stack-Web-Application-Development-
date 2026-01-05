import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async findAll() {
    const movies = await this.moviesRepository.find({
      relations: ['genres', 'reviews'],
      order: { created_at: 'DESC' },
    });
    return movies.map(movie => this.calculateAverageRating(movie));
  }

  async findByGenre(genreId: number) {
    const movies = await this.moviesRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.genres', 'genre')
      .leftJoinAndSelect('movie.reviews', 'reviews')
      .where('genre.id = :genreId', { genreId })
      .orderBy('movie.created_at', 'DESC')
      .getMany();
    return movies.map(movie => this.calculateAverageRating(movie));
  }

  async getFeaturedMovie() {
    const movies = await this.moviesRepository.find({
      relations: ['genres', 'reviews'],
    });
    const moviesWithAvg = movies.map(movie => this.calculateAverageRating(movie));
    moviesWithAvg.sort((a, b) => b.averageRating - a.averageRating);
    return moviesWithAvg[0] || null;
  }

  async findOne(id: number) {
    const movie = await this.moviesRepository.findOne({
      where: { movie_id: id },
      relations: ['genres', 'reviews', 'reviews.user'],
    });
    return movie ? this.calculateAverageRating(movie) : null;
  }

  private calculateAverageRating(movie: any) {
    const reviews = movie.reviews || [];
    const averageRating = reviews.length > 0
      ? reviews.reduce((sum: number, r: any) => sum + r.score, 0) / reviews.length
      : 0;
    return { ...movie, averageRating };
  }

  create(data: any) {
    return this.moviesRepository.save(data);
  }

  async update(id: number, data: any) {
    await this.moviesRepository.update(id, data);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.moviesRepository.delete(id);
  }
}