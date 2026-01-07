import { IsNumber, IsString, Min, Max, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  movieId: number; // ไอดีหนังที่จะรีวิว

  @IsString()
  @IsOptional() // คอมเมนต์ใส่หรือไม่ใส่ก็ได้
  comment?: string;

  @IsNumber()
  @Min(1)
  @Max(5) // บังคับคะแนน 1-5 ดาว
  rating: number;
}