import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './MovieDetail.css';

interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  user: { username: string };
}

interface Movie {
  movie_id: number;
  title: string;
  description: string;
  posterUrl: string;
  director: string;
  releaseDate: string;
  duration: number;
  rating: number;
  genres: Array<{ id: number; name: string }>;
  reviews: Review[];
}

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, token } = useAuth();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
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
        <div className="movie-info">
          <img src={movie.posterUrl} alt={movie.title} className="movie-poster-large" />
          <div className="movie-text">
            <h1>{movie.title}</h1>
            <div className="movie-meta">
              <span>⭐ {(Number(movie.rating) || 0).toFixed(1)}</span>
              <span>{movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : ''}</span>
              <span>{movie.duration} นาที</span>
              <span>ผู้กำกับ: {movie.director}</span>
            </div>
            <div className="movie-genres">
              {movie.genres.map((g) => (
                <span key={g.id} className="genre-tag">
                  {g.name}
                </span>
              ))}
            </div>
            <p className="movie-description">{movie.description}</p>
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
