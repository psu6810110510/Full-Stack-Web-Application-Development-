import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'; // อย่าลืม import เพิ่มตรงนี้
import { Genre } from '../genres/genre.entity';
import { Review } from '../reviews/review.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  movie_id!: number;

  @Column()
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ nullable: true })
  posterUrl!: string;

  // --- ส่วนที่แนะนำให้เพิ่ม ---
  
  @Column({ nullable: true })
  director!: string; // ผู้กำกับ

  @Column({ type: 'date', nullable: true })
  releaseDate!: Date; // วันที่ฉาย (ใช้เรียงลำดับหนังใหม่)

  @Column({ nullable: true })
  duration!: number; // ความยาวหนัง (นาที)

  // Auto-generated timestamp: มีประโยชน์มากตอนทำฟีเจอร์ "หนังมาใหม่"
  @CreateDateColumn()
  created_at!: Date; 

  @UpdateDateColumn()
  updated_at!: Date;

  // --------------------------

  @ManyToMany(() => Genre, (genre) => genre.movies)
  @JoinTable() 
  genres!: Genre[];

  @OneToMany(() => Review, (review) => review.movie)
  reviews!: Review[];
}