import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';  
import { User } from './users/user.entity'; 
import { Movie } from './movies/movie.entity';
import { Genre } from './genres/genre.entity'; 
import { Review } from './reviews/review.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'admin',     
      password: 'password123', 
      database: 'movie_review_db',
      entities: [User, Movie, Genre, Review],       
      synchronize: true,      
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}