import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Genre } from '../genres/genre.entity';
import { Review } from '../reviews/review.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  posterUrl: string;

  @Column({ type: 'float', default: 0 })
  averageRating: number;

  @ManyToMany(() => Genre, (genre) => genre.movies)
  @JoinTable() 
  genres: Genre[];

  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];
}