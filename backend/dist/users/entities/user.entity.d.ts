import { Review } from '../reviews/review.entity';
export declare class User {
    user_id: number;
    username: string;
    email: string;
    password: string;
    reviews: Review[];
}
