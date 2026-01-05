import { ReviewsService } from './reviews.service';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    getMovieReviews(movieId: string): Promise<import("./review.entity").Review[]>;
    createReview(req: any, body: {
        movieId: number;
        score: number;
        comment?: string;
    }): Promise<import("./review.entity").Review>;
}
