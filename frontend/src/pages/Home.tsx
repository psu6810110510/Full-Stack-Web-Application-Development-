import { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import MovieRow from '../components/MovieRow';
import './Home.css';

interface Movie {
  movie_id: number;
  title: string;
  posterUrl: string;
  description: string;
  director: string;
  releaseDate: string;
  duration: number;
  averageRating: number;
  genres: Array<{ id: number; name: string }>;
}

interface Genre {
  id: number;
  name: string;
  movies: Movie[];
}

export default function Home() {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured movie
        const featuredRes = await fetch('http://localhost:3000/movies/featured');
        if (featuredRes.ok) {
          const featuredData = await featuredRes.json();
          setFeaturedMovie(featuredData);
        }

        // Fetch genres with movies
        const genresRes = await fetch('http://localhost:3000/genres');
        if (genresRes.ok) {
          const genresData = await genresRes.json();
          setGenres(genresData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home">
      <HeroSection movie={featuredMovie} />
      <div className="rows-container">
        {genres
          .filter((genre) => genre.movies && genre.movies.length > 0)
          .map((genre) => (
            <MovieRow key={genre.id} title={genre.name} movies={genre.movies} />
          ))}
      </div>
    </div>
  );
}
