import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from './review.entity';
import { Movie } from '../movies/movie.entity'; // 👈 เช็ค path Movie ให้ถูกนะครับ

@Module({
  imports: [TypeOrmModule.forFeature([Review, Movie])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
