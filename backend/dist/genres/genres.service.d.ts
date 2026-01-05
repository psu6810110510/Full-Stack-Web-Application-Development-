import { Repository } from 'typeorm';
import { Genre } from './genre.entity';
export declare class GenresService {
    private genreRepository;
    constructor(genreRepository: Repository<Genre>);
    findAll(): Promise<Genre[]>;
}
