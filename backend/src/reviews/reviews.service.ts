import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async findByMovie(movieId: number): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { movie: { movie_id: movieId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async create(data: { userId: number; movieId: number; score: number; comment?: string }): Promise<Review> {
    const review = this.reviewRepository.create({
      user: { id: data.userId },
      movie: { movie_id: data.movieId },
      score: data.score,
      comment: data.comment,
    });
    return this.reviewRepository.save(review);
  }
}
