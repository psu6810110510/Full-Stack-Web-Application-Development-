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
    findAll() {
        return this.moviesRepository.find({
            relations: ['genres'],
            order: {
                movie_id: 'ASC',
            },
        });
    }
    async findOne(id) {
        const movie = await this.moviesRepository.findOne({
            where: { movie_id: id },
            relations: ['reviews', 'reviews.user', 'genres'],
        });
        if (!movie) {
            throw new common_1.NotFoundException(`Movie with ID ${id} not found`);
        }
        return movie;
    }
    async getFeaturedMovie() {
        const movies = await this.moviesRepository.find({
            relations: ['genres'],
            order: { rating: 'DESC' },
            take: 1,
        });
        return movies[0];
    }
    async findByGenre(genreId) {
        return this.moviesRepository.find({
            where: {
                genres: { id: genreId }
            },
            relations: ['genres'],
            order: { rating: 'DESC' }
        });
    }
    create(data) {
        return this.moviesRepository.save(data);
    }
    async update(id, data) {
        const movie = await this.findOne(id);
        if (!data || Object.keys(data).length === 0) {
            return movie;
        }
        const updatedMovie = this.moviesRepository.merge(movie, data);
        return this.moviesRepository.save(updatedMovie);
    }
    async remove(id) {
        const movie = await this.findOne(id);
        await this.moviesRepository.delete({ movie_id: id });
        return { message: `Movie with ID ${id} deleted successfully` };
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movie_entity_1.Movie)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MoviesService);
//# sourceMappingURL=movies.service.js.map