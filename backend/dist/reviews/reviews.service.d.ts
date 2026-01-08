import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from '../users/entities/user.entity';
import { Movie } from '../movies/movie.entity';
export declare class ReviewsService {
    private reviewsRepository;
    private moviesRepository;
    constructor(reviewsRepository: Repository<Review>, moviesRepository: Repository<Movie>);
    create(createReviewDto: CreateReviewDto, user: User): Promise<Review>;
    findAll(): Promise<Review[]>;
    findByMovie(movieId: number): Promise<Review[]>;
    private updateMovieRating;
}
