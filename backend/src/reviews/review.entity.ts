import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Movie } from '../movies/movie.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  score: number; 

  @Column({ type: 'text' })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.reviews)
  movie: Movie;
}