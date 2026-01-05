// backend/src/movies/movies.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
// import { CreateMovieDto } from './dto/create-movie.dto'; // ถ้ายังไม่มี DTO ให้ใช้ any ไปก่อนหรือ comment ไว้
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user-role.enum';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // 🟢 ดูหนัง (ใครก็ได้ดูได้)
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  // 🔴 เพิ่มหนัง (ADMIN เท่านั้น)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createMovieDto: any) { // ใช้ any ไปก่อนถ้ายังไม่สร้าง DTO
    return this.moviesService.create(createMovieDto);
  }

  // 🔴 แก้ไขหนัง (ADMIN เท่านั้น)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: any) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  // 🔴 ลบหนัง (ADMIN เท่านั้น)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}