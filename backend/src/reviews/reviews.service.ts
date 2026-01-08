import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from '../users/entities/user.entity'; // เช็ค path
import { Movie } from '../movies/movie.entity';       // เช็ค path

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async create(createReviewDto: CreateReviewDto, user: User): Promise<Review> {
    const { movieId, comment, rating } = createReviewDto;

    // 1. เช็คว่าหนังมีอยู่จริงไหม
    const movie = await this.moviesRepository.findOne({ where: { movie_id: movieId } });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    // 2. เช็คว่า User คนนี้เคยรีวิวหนังเรื่องนี้ไปหรือยัง? (ห้ามซ้ำ)
    const existingReview = await this.reviewsRepository.findOne({
      where: {
        user: { id: user.id }, 
        // 👇 แก้ตรงนี้: เปลี่ยน id เป็น movie_id (ถ้า Movie Entity ใช้ชื่อนี้)
        movie: { movie_id: movieId },
      },
    });

    if (existingReview) {
      throw new ConflictException('You have already reviewed this movie');
    }

    // 3. สร้างและบันทึกรีวิว
    const review = this.reviewsRepository.create({
      comment,
      rating,
      user,     
      movie,
    });

    await this.reviewsRepository.save(review);

    await this.updateMovieRating(movieId);

    return review;
  }
  async findAll(): Promise<Review[]> {
    return this.reviewsRepository.find({
      relations: {
        user: true,   // ดึงข้อมูลคนรีวิวมาด้วย
        movie: true,  // ดึงข้อมูลหนังมาด้วย
      },
      order: {
        createdAt: 'DESC', // เรียงจากใหม่ไปเก่า
      },
    });
  }
  // 🆕 3. เพิ่มฟังก์ชันนี้มาจาก Incoming (เอาไว้ดูรีวิวของหนังเรื่องนั้นๆ)
  async findByMovie(movieId: number): Promise<Review[]> {
    return this.reviewsRepository.find({
      where: { movie: { movie_id: movieId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }
  // 🔥 [จุดที่ 2] เพิ่มฟังก์ชันนี้ไว้ล่างสุดของไฟล์ (ก่อนปีกกาปิดสุดท้าย)
  private async updateMovieRating(movieId: number) {
    // หาค่าเฉลี่ย (AVG)
    const { avg } = await this.reviewsRepository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'avg')
      .where('review.movie.movie_id = :id', { id: movieId })
      .getRawOne();

    // แปลงค่าและอัปเดตลงตาราง Movie
    const averageRating = parseFloat(avg) || 0;
    await this.moviesRepository.update(movieId, {
      rating: Number(averageRating.toFixed(1)), 
    });
  }
}
