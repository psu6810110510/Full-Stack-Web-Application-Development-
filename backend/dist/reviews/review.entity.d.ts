import { User } from '../users/entities/user.entity';
import { Movie } from '../movies/movie.entity';
export declare class Review {
    id: number;
    rating: number;
    comment: string;
    createdAt: Date;
    user: User;
    movie: Movie;
}
