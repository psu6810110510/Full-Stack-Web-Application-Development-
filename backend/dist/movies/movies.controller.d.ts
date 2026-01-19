import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    findAll(genreId?: string): Promise<{
        averageRating: number;
        movie_id: number;
        title: string;
        description: string;
        posterUrl: string;
        director: string;
        releaseDate: Date;
        duration: number;
        rating: number;
        created_at: Date;
        updated_at: Date;
        genres: import("../genres/genre.entity").Genre[];
        reviews: import("../reviews/review.entity").Review[];
    }[]>;
    getFeaturedMovie(): Promise<{
        averageRating: number;
        movie_id: number;
        title: string;
        description: string;
        posterUrl: string;
        director: string;
        releaseDate: Date;
        duration: number;
        rating: number;
        created_at: Date;
        updated_at: Date;
        genres: import("../genres/genre.entity").Genre[];
        reviews: import("../reviews/review.entity").Review[];
    }>;
    findOne(movie_id: string): Promise<{
        averageRating: number;
        movie_id: number;
        title: string;
        description: string;
        posterUrl: string;
        director: string;
        releaseDate: Date;
        duration: number;
        rating: number;
        created_at: Date;
        updated_at: Date;
        genres: import("../genres/genre.entity").Genre[];
        reviews: import("../reviews/review.entity").Review[];
    }>;
    create(createMovieDto: CreateMovieDto): Promise<import("./movie.entity").Movie>;
    update(movie_id: string, updateMovieDto: any): Promise<import("./movie.entity").Movie>;
    remove(movie_id: string): Promise<{
        message: string;
    }>;
}
