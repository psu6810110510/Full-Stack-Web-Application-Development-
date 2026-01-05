import { Repository } from 'typeorm';
import { Review } from './review.entity';
export declare class ReviewsService {
    private reviewRepository;
    constructor(reviewRepository: Repository<Review>);
    findByMovie(movieId: number): Promise<Review[]>;
    create(data: {
        userId: number;
        movieId: number;
        score: number;
        comment?: string;
    }): Promise<Review>;
}
