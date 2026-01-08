// backend/src/movies/movies.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user-role.enum'; // 👈 ตรวจสอบว่า path นี้มีไฟล์อยู่จริง
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // 🟢 ดูหนังทั้งหมด
  @Get()
  findAll(@Query('genreId') genreId?: string) {
    if (genreId) {
      return this.moviesService.findByGenre(parseInt(genreId));
    }
    return this.moviesService.findAll();
  }

  @Get('featured')
  getFeaturedMovie() {
    return this.moviesService.getFeaturedMovie();
  }

  @Get(':movie_id')
  findOne(@Param('movie_id') movie_id: string) {
    // ส่ง movie_id ไปให้ service ดึงข้อมูล
    return this.moviesService.findOne(+movie_id);
  }

  // 🔴 เพิ่มหนัง (ADMIN เท่านั้น)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) { // 👈 เปลี่ยน any เป็น Type ที่ถูกต้อง
    return this.moviesService.create(createMovieDto);
  }

  // 🔴 แก้ไขหนัง (ADMIN เท่านั้น)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':movie_id')
  update(@Param('movie_id') movie_id: string, @Body() updateMovieDto: any) {
    return this.moviesService.update(+movie_id, updateMovieDto);
  }

  // 🔴 ลบหนัง (ADMIN เท่านั้น)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':movie_id')
  remove(@Param('movie_id') movie_id: string) {
    return this.moviesService.remove(+movie_id);
  }
}