import { useNavigate } from 'react-router-dom';
import type { Movie } from '../interfaces';
import './HeroSection.css';

interface HeroSectionProps {
  movie: Movie | null;
}

export default function HeroSection({ movie }: HeroSectionProps) {
  const navigate = useNavigate();

  if (!movie) return null;

  return (
    <div
      className="hero"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(20,20,20,1)), url(${movie.posterUrl})`,
      }}
    >
      <div className="hero-content">
        <h1 className="hero-title">{movie.title}</h1>
        <div className="hero-info">
          <span className="hero-rating"> ⭐ {(Number(movie.rating) || 0).toFixed(1)}</span>
          <span>{movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : ''}</span>
          <span>{movie.duration} นาที</span>
        </div>
        <p className="hero-description">
          {movie.description.length > 200
            ? `${movie.description.substring(0, 200)}...`
            : movie.description}
        </p>
        <div className="hero-buttons">
          <button className="hero-btn play" onClick={() => navigate(`/movie/${movie.movie_id}`)}>
            ▶ รีวิว
          </button>
        </div>
      </div>
    </div>
  );
}
