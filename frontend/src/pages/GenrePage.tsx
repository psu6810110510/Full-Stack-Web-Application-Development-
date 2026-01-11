import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './GenrePage.css';

interface Movie {
  movie_id: number;
  title: string;
  posterUrl: string;
}

export default function GenrePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genreName, setGenreName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        setLoading(true);
        
        // Fetch movies by genre
        const moviesRes = await fetch(`http://localhost:3000/movies?genreId=${id}`);
        if (moviesRes.ok) {
          const moviesData = await moviesRes.json();
          setMovies(moviesData);
        }

        // Fetch genre name
        const genresRes = await fetch('http://localhost:3000/genres');
        if (genresRes.ok) {
          const genresData = await genresRes.json();
          const genre = genresData.find((g: any) => g.id === parseInt(id || '0'));
          if (genre) {
            setGenreName(genre.name);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMoviesByGenre();
    }
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="genre-page">
      <div className="genre-header">
        <h1>{genreName || 'หนัง'}</h1>
        <p>{movies.length} เรื่อง</p>
      </div>

      <div className="movies-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.movie_id}
              className="movie-card"
              onClick={() => navigate(`/movie/${movie.movie_id}`)}
            >
              <img src={movie.posterUrl} alt={movie.title} />
              <h3>{movie.title}</h3>
            </div>
          ))
        ) : (
          <p className="no-movies">ไม่มีหนังในหมวดหมู่นี้</p>
        )}
      </div>
    </div>
  );
}
