import { Review } from '../reviews/review.entity';
export declare enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
}
export declare class User {
    id: number;
    username: string;
    password: string;
    email: string;
    role: UserRole;
    reviews: Review[];
}
