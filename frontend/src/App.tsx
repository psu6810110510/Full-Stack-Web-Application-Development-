import { useState, useEffect } from 'react';
import './App.css';

// --- ย้ายส่วน Interface มาไว้ตรงนี้ชั่วคราว ---
export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  averageRating: number;
  genres: Genre[];
}
// ------------------------------------------

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:3000/movies');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container">
      <h1>Movie Reviews</h1>
      <div className="grid">
        {movies.map((movie) => (
          <div key={movie.id} className="card">
            {/* ใส่ style inline เพื่อป้องกันรูปใหญ่เกินถ้ายังไม่ได้แก้ css */}
            <img src={movie.posterUrl} alt={movie.title} style={{ width: '150px', borderRadius: '8px' }} />
            <h3>{movie.title}</h3>
            <p>Rating: {movie.averageRating?.toFixed(1) || '0.0'}</p>
            <div>
              {movie.genres?.map((g) => (
                <span key={g.id} style={{ margin: '0 5px', fontSize: '0.8em', color: '#666' }}>
                  {g.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;