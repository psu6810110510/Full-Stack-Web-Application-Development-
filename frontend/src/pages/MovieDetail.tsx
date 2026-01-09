import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Movie, Review } from '../interfaces';
import './MovieDetail.css';

// Extend Review interface to include createdAt
interface ReviewWithDate extends Review {
  createdAt: string;
}

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, token , role} = useAuth();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<ReviewWithDate[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieData();
  }, [id]);

  const fetchMovieData = async () => {
    try {
      const movieRes = await fetch(`http://localhost:3000/movies/${id}`);
      if (movieRes.ok) {
        const movieData = await movieRes.json();
        setMovie(movieData);
        setReviews(movieData.reviews || []);
      }
    } catch (error) {
      console.error('Error fetching movie:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (!window.confirm('คุณแน่ใจหรือไม่ที่จะลบหนังเรื่องนี้? การกระทำนี้ไม่สามารถย้อนกลับได้')) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/movies/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // ต้องมี Token ของ Admin
        },
      });

      if (res.ok) {
        alert('ลบหนังเรียบร้อยแล้ว');
        navigate('/'); // ลบเสร็จให้เด้งกลับหน้าแรก
      } else {
        alert('เกิดข้อผิดพลาดในการลบหนัง');
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
      alert('เกิดข้อผิดพลาด');
    }
  };


  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !token) {
      alert('กรุณาเข้าสู่ระบบก่อนรีวิว');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          movieId: parseInt(id!),
          rating: rating,
          comment: comment || null,
        }),
      });

      if (res.ok) {
        alert('รีวิวสำเร็จ!');
        setComment('');
        setRating(5);
        fetchMovieData(); // Refresh reviews
      } else {
        alert('เกิดข้อผิดพลาดในการรีวิว');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('เกิดข้อผิดพลาด');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!movie) {
    return <div className="error">Movie not found</div>;
  }

  return (
  <div className="movie-detail">
    <div
      className="movie-backdrop"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), #141414), url(${movie.posterUrl})`,
      }}
    >
      {/* 🟢 1. เพิ่มปุ่มย้อนกลับ (มุมซ้ายบน) */}
      <button 
        className="back-btn" 
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: '100px',
          left: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          padding: '8px 15px',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}
      >
        ⬅ ย้อนกลับ
      </button>

      <div className="movie-info">
        <img src={movie.posterUrl} alt={movie.title} className="movie-poster-large" />
        <div className="movie-text">
          <h1>{movie.title}</h1>
          {/* ... (Meta data เหมือนเดิม) ... */}
          
          <div className="movie-genres">
             {/* ... (Genres เหมือนเดิม) ... */}
          </div>
          
          <p className="movie-description">{movie.description}</p>

          <div className="action-buttons" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            {/* 🟢 2. เอาปุ่มรีวิวกลับมา (ถ้าต้องการ) */}
            <button 
              className="review-btn"
              onClick={() => {
                document.querySelector('.reviews-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                backgroundColor: 'white',
                color: 'black',
                border: 'none',
                padding: '10px 24px',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              ▶ รีวิว
            </button>

            {/* ปุ่ม Admin (แสดงต่อท้ายปุ่มรีวิว) */}
            {role === 'ADMIN' && (
              <>
                <button
                  onClick={() => navigate(`/edit-movie/${id}`)}
                  style={{ backgroundColor: '#ffa500', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  ✏️ แก้ไข
                </button>
                <button
                  onClick={handleDelete}
                  style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  🗑️ ลบหนัง
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>



      <div className="reviews-section">
        <h2>รีวิวจากผู้ชม ({reviews.length})</h2>

        {isAuthenticated ? (
          <form className="review-form" onSubmit={handleSubmitReview}>
            <h3>เขียนรีวิวของคุณ</h3>
            <div className="rating-input">
              <label>คะแนน:</label>
              <div className="stars">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                  <span
                    key={star}
                    className={`star ${star <= rating ? 'active' : ''}`}
                    onClick={() => setRating(star)}
                  >
                    ⭐
                  </span>
                ))}
              </div>
              <span className="rating-value">{rating}/10</span>
            </div>
            <textarea
              placeholder="เขียนความคิดเห็น"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
            <button type="submit" className="submit-btn">
              ส่งรีวิว
            </button>
          </form>
        ) : (
          <p className="login-prompt">เข้าสู่ระบบเพื่อเขียนรีวิว</p>
        )}

        <div className="reviews-list">
          {reviews.length === 0 ? (
            <p className="no-reviews">ยังไม่มีรีวิว เป็นคนแรกที่รีวิวหนังเรื่องนี้!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <span className="reviewer">{review.user.username}</span>
                  <span className="review-score">⭐ {review.rating ?? 0}/10</span>
                </div>
                {review.comment && <p className="review-comment">{review.comment}</p>}
                <span className="review-date">
                  {new Date(review.createdAt).toLocaleDateString('th-TH')}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
