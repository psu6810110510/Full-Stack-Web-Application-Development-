import { User } from '../users/user.entity';
import { Movie } from '../movies/movie.entity';
export declare class Review {
    id: number;
    score: number;
    comment: string;
    createdAt: Date;
    user: User;
    movie: Movie;
}
