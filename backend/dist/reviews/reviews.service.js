"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const review_entity_1 = require("./review.entity");
const movie_entity_1 = require("../movies/movie.entity");
let ReviewsService = class ReviewsService {
    constructor(reviewsRepository, moviesRepository) {
        this.reviewsRepository = reviewsRepository;
        this.moviesRepository = moviesRepository;
    }
    async create(createReviewDto, user) {
        const { movieId, comment, rating } = createReviewDto;
        const movie = await this.moviesRepository.findOne({ where: { movie_id: movieId } });
        if (!movie) {
            throw new common_1.NotFoundException(`Movie with ID ${movieId} not found`);
        }
        const existingReview = await this.reviewsRepository.findOne({
            where: {
                user: { id: user.id },
                movie: { movie_id: movieId },
            },
        });
        if (existingReview) {
            throw new common_1.ConflictException('You have already reviewed this movie');
        }
        const review = this.reviewsRepository.create({
            comment,
            rating,
            user: { id: user.id },
            movie: { movie_id: movieId },
        });
        await this.reviewsRepository.insert(review);
        await this.updateMovieRating(movieId);
        return review;
    }
    async findAll() {
        return this.reviewsRepository.find({
            relations: {
                user: true,
                movie: true,
            },
            order: {
                createdAt: 'DESC',
            },
        });
    }
    async updateMovieRating(movieId) {
        const { avg } = await this.reviewsRepository
            .createQueryBuilder('review')
            .select('AVG(review.rating)', 'avg')
            .where('review.movie.movie_id = :id', { id: movieId })
            .getRawOne();
        const averageRating = parseFloat(avg) || 0;
        await this.moviesRepository.update(movieId, {
            rating: Number(averageRating.toFixed(1)),
        });
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __param(1, (0, typeorm_1.InjectRepository)(movie_entity_1.Movie)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map