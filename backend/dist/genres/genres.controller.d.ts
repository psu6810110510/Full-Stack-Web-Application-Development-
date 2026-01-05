import { GenresService } from './genres.service';
export declare class GenresController {
    private readonly genresService;
    constructor(genresService: GenresService);
    findAll(): Promise<import("./genre.entity").Genre[]>;
}
