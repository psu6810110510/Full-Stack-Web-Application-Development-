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
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const movie_entity_1 = require("./movie.entity");
let MoviesService = class MoviesService {
    constructor(moviesRepository) {
        this.moviesRepository = moviesRepository;
    }
    async findAll() {
        const movies = await this.moviesRepository.find({
            relations: ['genres', 'reviews'],
            order: { created_at: 'DESC' },
        });
        return movies.map(movie => this.calculateAverageRating(movie));
    }
    async findByGenre(genreId) {
        const movies = await this.moviesRepository
            .createQueryBuilder('movie')
            .leftJoinAndSelect('movie.genres', 'genre')
            .leftJoinAndSelect('movie.reviews', 'reviews')
            .where('genre.id = :genreId', { genreId })
            .orderBy('movie.created_at', 'DESC')
            .getMany();
        return movies.map(movie => this.calculateAverageRating(movie));
    }
    async getFeaturedMovie() {
        const movies = await this.moviesRepository.find({
            relations: ['genres', 'reviews'],
        });
        const moviesWithAvg = movies.map(movie => this.calculateAverageRating(movie));
        moviesWithAvg.sort((a, b) => b.averageRating - a.averageRating);
        return moviesWithAvg[0] || null;
    }
    async findOne(id) {
        const movie = await this.moviesRepository.findOne({
            where: { movie_id: id },
            relations: ['genres', 'reviews', 'reviews.user'],
        });
        return movie ? this.calculateAverageRating(movie) : null;
    }
    calculateAverageRating(movie) {
        const reviews = movie.reviews || [];
        const averageRating = reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.score, 0) / reviews.length
            : 0;
        return Object.assign(Object.assign({}, movie), { averageRating });
    }
    create(data) {
        return this.moviesRepository.save(data);
    }
    async update(id, data) {
        await this.moviesRepository.update(id, data);
        return this.findOne(id);
    }
    remove(id) {
        return this.moviesRepository.delete(id);
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movie_entity_1.Movie)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MoviesService);
//# sourceMappingURL=movies.service.js.map