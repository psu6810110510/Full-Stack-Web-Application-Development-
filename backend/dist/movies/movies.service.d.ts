import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
export declare class MoviesService {
    private moviesRepository;
    constructor(moviesRepository: Repository<Movie>);
    findAll(): Promise<any[]>;
    findByGenre(genreId: number): Promise<any[]>;
    getFeaturedMovie(): Promise<any>;
    findOne(id: number): Promise<any>;
    private calculateAverageRating;
    create(data: any): Promise<any>;
    update(id: number, data: any): Promise<any>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
