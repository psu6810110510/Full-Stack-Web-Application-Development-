// --- เริ่มต้นไฟล์ ---

// 1. Enum Role (ใช้บอกสิทธิ์)
export type UserRole = 'ADMIN' | 'USER';

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}

// 3. Genre Interface
export interface Genre {
  id: number;
  name: string;
}

// 4. Movie Interface (รวม properties ทั้งหมดที่ใช้ในโปรเจค)
export interface Movie {
  movie_id: number;        // ID จริงที่มาจาก backend
  title: string;
  description: string;
  posterUrl: string;
  director: string;
  releaseDate: string;
  duration: number;
  rating: number;          // คะแนนเฉลี่ย (rating จาก entity)
  averageRating?: number;  // สำหรับ backward compatibility
  genres: Genre[];
}

// 5. Review Interface
export interface Review {
  id: number;
  rating: number;
  comment: string;
  user: User;
}
// --- จบไฟล์ ---