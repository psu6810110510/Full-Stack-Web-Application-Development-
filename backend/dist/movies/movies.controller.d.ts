import { MoviesService } from './movies.service';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    findAll(genreId?: string): Promise<import("./movie.entity").Movie[]>;
    getFeaturedMovie(): Promise<import("./movie.entity").Movie>;
    findOne(movie_id: string): Promise<import("./movie.entity").Movie>;
    create(createMovieDto: any): Promise<any>;
    update(movie_id: string, updateMovieDto: any): Promise<import("./movie.entity").Movie>;
    remove(movie_id: string): Promise<{
        message: string;
    }>;
}
