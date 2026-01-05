import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('movie/:movieId')
  async getMovieReviews(@Param('movieId') movieId: string) {
    return this.reviewsService.findByMovie(parseInt(movieId));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createReview(@Request() req, @Body() body: { movieId: number; score: number; comment?: string }) {
    return this.reviewsService.create({
      userId: req.user.userId,
      movieId: body.movieId,
      score: body.score,
      comment: body.comment,
    });
  }
}
