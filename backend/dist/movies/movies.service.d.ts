import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
export declare class MoviesService {
    private moviesRepository;
    constructor(moviesRepository: Repository<Movie>);
    findAll(): Promise<Movie[]>;
    findOne(id: number): Promise<Movie>;
    getFeaturedMovie(): Promise<Movie>;
    findByGenre(genreId: number): Promise<Movie[]>;
    create(data: any): Promise<any>;
    update(id: number, data: any): Promise<Movie>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
