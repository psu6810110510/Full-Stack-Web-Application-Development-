import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
export declare class MoviesService {
    private moviesRepository;
    constructor(moviesRepository: Repository<Movie>);
    private calculateAverageRating;
    findAll(): Promise<{
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
    findOne(id: number): Promise<{
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
    findByGenre(genreId: number): Promise<{
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
    create(data: CreateMovieDto): Promise<Movie>;
    update(id: number, data: any): Promise<Movie>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
