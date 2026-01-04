import { MoviesService } from './movies.service';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    findAll(): Promise<import("./movie.entity").Movie[]>;
    findOne(id: string): Promise<import("./movie.entity").Movie>;
    create(createMovieDto: any): Promise<any>;
    update(id: string, updateMovieDto: any): Promise<import("./movie.entity").Movie>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
