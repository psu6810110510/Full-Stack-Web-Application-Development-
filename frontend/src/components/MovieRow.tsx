import { useNavigate } from 'react-router-dom';
import type { Movie } from '../interfaces';
import './MovieRow.css';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  const navigate = useNavigate();

  return (
    <div className="movie-row">
      <h2 className="row-title">{title}</h2>
      <div className="row-posters">
        {movies.map((movie) => (
          <div
            key={movie.movie_id}
            className="movie-poster"
            onClick={() => navigate(`/movie/${movie.movie_id}`)}
          >
            <img src={movie.posterUrl} alt={movie.title} />
            <div className="poster-overlay">
              <h3>{movie.title}</h3>
              <p>⭐ {(movie.rating || movie.averageRating || 0) > 0 ? (movie.rating || movie.averageRating || 0).toFixed(1) : 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
