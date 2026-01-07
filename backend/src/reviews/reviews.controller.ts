import { Controller,Get , Post, Body, UseGuards, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // 👈 เช็ค path ให้ถูก

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // 🔒 ต้องล็อกอินก่อนถึงจะรีวิวได้
  create(@Body() createReviewDto: CreateReviewDto, @Request() req) {
    // req.user คือข้อมูล User ที่แกะออกมาจาก Token (คนรีวิวคือคนที่ล็อกอินอยู่)
    return this.reviewsService.create(createReviewDto, req.user);     
  } // 👈 2. ต้องมีปีกกาปิดฟังก์ชัน create ตรงนี้ก่อน!

  @Get() // แล้วค่อยขึ้นฟังก์ชันใหม่
  findAll() {
    return this.reviewsService.findAll();
  }
}