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

  create(data: any) {
    return this.moviesRepository.save(data);
  }

  // 👇 จุดสำคัญคือฟังก์ชันนี้ครับ ต้องใช้ .merge() และ .save() เท่านั้น
  async update(id: number, data: any) {
    // 1. ดึงข้อมูลเก่าออกมาก่อน
    const movie = await this.findOne(id);

    // 2. ถ้าไม่มีข้อมูลส่งมา ก็คืนค่าเดิมกลับไปเลย (ป้องกัน Error: UpdateValuesMissingError)
    if (!data || Object.keys(data).length === 0) {
      return movie;
    }

    // 3. เอาข้อมูลใหม่ (data) ไปทับข้อมูลเก่า (movie)
    const updatedMovie = this.moviesRepository.merge(movie, data);
    
    // 4. บันทึก (ใช้ .save แทน .update เพื่อแก้ปัญหาถาวร)
    return this.moviesRepository.save(updatedMovie);
  }

  async remove(id: number) {
    const movie = await this.findOne(id);
    await this.moviesRepository.delete({ movie_id: id });
    return { message: `Movie with ID ${id} deleted successfully` };
  }
}