import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn  } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Movie } from '../movies/movie.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'text', nullable: true})
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.reviews, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.reviews, { eager: false,nullable: false, onDelete: 'CASCADE' }) // 👈 เพิ่ม onDelete: 'CASCADE'
  @JoinColumn({ name: 'movie_id' }) // 👈 เพิ่มบรรทัดนี้
  movie: Movie;
}