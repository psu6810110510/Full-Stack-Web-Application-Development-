// --- เริ่มต้นไฟล์ ---

// 1. Enum Role (ใช้บอกสิทธิ์)
export type UserRole = 'ADMIN' | 'USER';

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole; // ใช้ได้เหมือนกัน
}

// 3. Genre Interface
export interface Genre {
  id: number;
  name: string;
}

// 4. Movie Interface
export interface Movie {
  id: number;
  title: string;
  posterUrl?: string;    // เครื่องหมาย ? แปลว่า มีหรือไม่มีก็ได้
  averageRating: number;
  genres: Genre[];
}

// 5. Review Interface
export interface Review {
  id: number;
  score: number;
  comment: string;
  user: User;
}
// --- จบไฟล์ ---