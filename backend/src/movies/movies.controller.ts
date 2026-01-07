// backend/src/movies/movies.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user-role.enum'; // 👈 ตรวจสอบว่า path นี้มีไฟล์อยู่จริง

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // 🟢 ดูหนังทั้งหมด
  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  // 🟢 ดูรายละเอียดหนังรายเรื่อง (แก้จาก :id เป็น :movie_id)
  @Get(':movie_id')
  findOne(@Param('movie_id') movie_id: string) {
    // ส่ง movie_id ไปให้ service ดึงข้อมูล
    return this.moviesService.findOne(+movie_id);
  }

  // 🔴 เพิ่มหนัง (ADMIN เท่านั้น)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createMovieDto: any) { 
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