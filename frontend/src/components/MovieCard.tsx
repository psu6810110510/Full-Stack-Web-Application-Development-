import React from 'react';
// 1. เช็คชื่อไฟล์ให้ตรง (ถ้าไฟล์ชื่อ types.ts ให้แก้ตรงนี้)
import type { Movie } from '../types'; 

interface MovieCardProps {
  movie: Movie;
  onViewDetail: (id: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onViewDetail }) => {
  return (
    <div className="card" style={{ border: '1px solid #ddd', padding: '10px', margin: '10px', width: '200px' }}>
      {/* ใส่ fallback เผื่อไม่มีรูป */}
      <img 
        src={movie.posterUrl || 'https://via.placeholder.com/150'} 
        alt={movie.title} 
        style={{ width: '100%', borderRadius: '8px' }} 
      />
      <h3>{movie.title}</h3>
      
      {/* 2. เปลี่ยนจาก Rating เป็น Description (เพราะเรามี field นี้ชัวร์ๆ) */}
      <p style={{ fontSize: '12px', color: '#666' }}>
         {movie.description ? movie.description.substring(0, 50) + '...' : 'No description'}
      </p>

      {/* 3. แก้ movie.id เป็น movie.movie_id ให้ตรงกับ database */}
      <button onClick={() => onViewDetail(movie.movie_id)}>
        View Details
      </button>
    </div>
  );
};

export default MovieCard;