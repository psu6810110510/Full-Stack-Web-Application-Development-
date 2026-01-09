import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Genre } from '../interfaces';
import './AddMoviePage.css'; // ใช้ CSS เดิมของหน้าเพิ่มหนัง

export default function EditMoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  
  const [genres, setGenres] = useState<Genre[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    posterUrl: '',
    director: '',
    releaseDate: '',
    duration: 0,
    genreIds: [] as number[],
  });

  // 1. ดึงข้อมูลหนังเดิม + หมวดหมู่ มาแสดง
  useEffect(() => {
    const fetchData = async () => {
      try {
        const genreRes = await fetch('http://localhost:3000/genres');
        const genreData = await genreRes.json();
        setGenres(genreData);

        const movieRes = await fetch(`http://localhost:3000/movies/${id}`);
        if (movieRes.ok) {
            const movie = await movieRes.json();
            setFormData({
                title: movie.title,
                description: movie.description,
                posterUrl: movie.posterUrl,
                director: movie.director,
                releaseDate: movie.releaseDate.split('T')[0],
                duration: movie.duration,
                genreIds: movie.genres.map((g: any) => g.id),
            });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'duration' ? parseInt(value) || 0 : value }));
  };

  const handleGenreChange = (genreId: number, isChecked: boolean) => {
    setFormData(prev => {
      if (isChecked) return { ...prev, genreIds: [...prev.genreIds, genreId] };
      else return { ...prev, genreIds: prev.genreIds.filter(id => id !== genreId) };
    });
  };

  // 2. ส่งข้อมูลแบบ PATCH เพื่อแก้ไข
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/movies/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('แก้ไขข้อมูลสำเร็จ!');
        navigate(`/movie/${id}`);
      } else {
        alert('แก้ไขไม่สำเร็จ');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="add-movie-page">
      <div className="add-movie-container">
        <h1>✏️ แก้ไขข้อมูลหนัง</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ชื่อเรื่อง</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>เรื่องย่อ</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={4} required />
          </div>
          <div className="form-group">
            <label>ลิงก์โปสเตอร์</label>
            <input type="url" name="posterUrl" value={formData.posterUrl} onChange={handleChange} required />
          </div>
          <div className="form-group-row">
            <div className="form-group">
                <label>ผู้กำกับ</label>
                <input type="text" name="director" value={formData.director} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>วันฉาย</label>
                <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>ความยาว (นาที)</label>
                <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-group">
            <label>หมวดหมู่</label>
            <div className="genre-checkboxes">
              {genres.map((genre) => (
                <label key={genre.id} className="checkbox-label">
                  <input type="checkbox" value={genre.id} checked={formData.genreIds.includes(genre.id)} onChange={(e) => handleGenreChange(genre.id, e.target.checked)} />
                  {genre.name}
                </label>
              ))}
            </div>
          </div>
          <button type="submit" className="submit-btn" style={{backgroundColor: '#ffa500'}}>บันทึกการแก้ไข</button>
        </form>
      </div>
    </div>
  );
}