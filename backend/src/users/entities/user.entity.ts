import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Review } from '../reviews/review.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number; // ตรงกับในรูป PK

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  // Relation: 1 User เขียนได้หลาย Review
  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}