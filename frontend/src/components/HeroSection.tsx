import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

interface Movie {
  movie_id: number;
  title: string;
  description: string;
  posterUrl: string;
  director: string;
  releaseDate: string;
  duration: number;
  averageRating: number;
  genres: Array<{ id: number; name: string }>;
}

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
          <span className="hero-rating">⭐ {movie.averageRating.toFixed(1)}</span>
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
