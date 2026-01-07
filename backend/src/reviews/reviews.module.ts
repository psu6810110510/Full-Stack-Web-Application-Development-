import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from './review.entity';
import { Movie } from '../movies/movie.entity'; // 👈 เช็ค path Movie ให้ถูกนะครับ

@Module({
  // เราต้องบอก Module นี้ว่าเราจะใช้ตาราง Review และ Movie นะ
  imports: [TypeOrmModule.forFeature([Review, Movie])], 
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}