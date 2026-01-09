import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Genre } from '../interfaces';
import './AddMoviePage.css';

export default function AddMoviePage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  
  // State สำหรับเก็บรายชื่อหมวดหมู่ทั้งหมดที่ดึงมาจาก API
  const [genres, setGenres] = useState<Genre[]>([]);

  // State สำหรับเก็บข้อมูลที่จะส่งไปบันทึก
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    posterUrl: '',
    director: '',
    releaseDate: '',
    duration: 0,
    genreIds: [] as number[], // เก็บเป็น Array ของ ID
  });

  // 1. ดึงข้อมูล Genres เมื่อเปิดหน้านี้
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch('http://localhost:3000/genres');
        if (res.ok) {
          const data = await res.json();
          setGenres(data);
        }
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  // 2. ฟังก์ชันจัดการ Text Input ทั่วไป
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) || 0 : value,
    }));
  };

  // 3. ฟังก์ชันจัดการ Checkbox (พระเอกของเราในรอบนี้) ⭐
  const handleGenreChange = (genreId: number, isChecked: boolean) => {
    setFormData((prev) => {
      if (isChecked) {
        // ถ้าติ๊กถูก -> เพิ่ม ID เข้าไป
        return { ...prev, genreIds: [...prev.genreIds, genreId] };
      } else {
        // ถ้าเอาออก -> กรอง ID นั้นทิ้งไป
        return { ...prev, genreIds: prev.genreIds.filter((id) => id !== genreId) };
      }
    });
  };

  // 4. ฟังก์ชันกดปุ่มบันทึก
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ตรวจสอบความถูกต้องเบื้องต้น
    if (formData.genreIds.length === 0) {
      alert('กรุณาเลือกหมวดหมู่อย่างน้อย 1 อย่าง');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // อย่าลืมส่ง Token ไปยืนยันตัวตน
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('เพิ่มหนังสำเร็จ!');
        navigate('/'); // กลับไปหน้าแรก
      } else {
        alert('เกิดข้อผิดพลาดในการเพิ่มหนัง');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('เกิดข้อผิดพลาด');
    }
  };

  return (
    <div className="add-movie-page">
      <div className="add-movie-container">
        <h1>เพิ่มหนังใหม่ 🎬</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>ชื่อเรื่อง</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>เรื่องย่อ</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="form-group">
            <label>ลิงก์โปสเตอร์ (URL)</label>
            <input
              type="url"
              name="posterUrl"
              value={formData.posterUrl}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label>ผู้กำกับ</label>
              <input
                type="text"
                name="director"
                value={formData.director}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>วันฉาย</label>
              <input
                type="date"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>ความยาว (นาที)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>หมวดหมู่ (เลือกได้มากกว่า 1)</label>
            <div className="genre-checkboxes">
              {genres.map((genre) => (
                <label key={genre.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={genre.id}
                    checked={formData.genreIds.includes(genre.id)}
                    onChange={(e) => handleGenreChange(genre.id, e.target.checked)}
                  />
                  {genre.name}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-btn">บันทึกข้อมูล</button>
        </form>
      </div>
    </div>
  );
}