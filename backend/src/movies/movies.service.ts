import { Injectable } from '@nestjs/common';
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
    return this.moviesRepository.find();
  }

  findOne(id: number) {
    return this.moviesRepository.findOneBy({ movie_id: id });
  }

  create(data: any) {
    return this.moviesRepository.save(data);
  }

  async update(id: number, data: any) {
    await this.moviesRepository.update(id, data);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.moviesRepository.delete(id);
  }
}