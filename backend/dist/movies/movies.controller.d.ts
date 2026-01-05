import { MoviesService } from './movies.service';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    findAll(genreId?: string): Promise<any[]>;
    getFeaturedMovie(): Promise<any>;
    findOne(id: string): Promise<any>;
    create(createMovieDto: any): Promise<any>;
    update(id: string, updateMovieDto: any): Promise<any>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
