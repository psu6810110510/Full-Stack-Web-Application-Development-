export interface LoginResponse {
  access_token: string;
  role: 'ADMIN' | 'USER';
}

export interface User {
  id: number;
  username: string;
  role: 'ADMIN' | 'USER';
}

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  movie_id: number;
  title: string;
  posterUrl: string;
  description: string;
  director: string;
  releaseDate: string;
  duration: number;
  averageRating: number;
  genres: Genre[];
}