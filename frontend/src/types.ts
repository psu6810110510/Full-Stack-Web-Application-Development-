export interface LoginResponse {
  access_token: string;
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
  id: number;          
  title: string;       
  posterUrl: string;
  averageRating: number;
  genres: Genre[];
}