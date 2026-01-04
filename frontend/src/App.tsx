import { useState, useEffect } from 'react';
import Login from './Login'; 
import type { Movie } from './types'; 
import './App.css';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleLoginSuccess = (newToken: string) => {
    localStorage.setItem('token', newToken); 
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setMovies([]);
  };

  useEffect(() => {
    if (!token) return;

    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:3000/movies', {
          headers: { 
            'Authorization': `Bearer ${token}`, // ยื่นบัตรผ่านให้ Backend ดู
            'Content-Type': 'application/json'
          },
        });
        
        if (response.ok) {
           const data = await response.json();
           setMovies(data);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [token]);

  
  if (!token) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Movie Reviews</h1>
        <button onClick={handleLogout} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>
          Logout
        </button>
      </div>

      <div className="grid">
        {movies.map((movie) => (
          <div key={movie.id} className="card">
            <img src={movie.posterUrl} alt={movie.title} style={{ width: '150px', borderRadius: '8px' }} />
            <h3>{movie.title}</h3>
            <p>Rating: {movie.averageRating ? Number(movie.averageRating).toFixed(1) : '0.0'}</p>
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