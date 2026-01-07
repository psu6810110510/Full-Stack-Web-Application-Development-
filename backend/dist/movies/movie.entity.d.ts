import { Genre } from '../genres/genre.entity';
import { Review } from '../reviews/review.entity';
export declare class Movie {
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
    genres: Genre[];
    reviews: Review[];
}
