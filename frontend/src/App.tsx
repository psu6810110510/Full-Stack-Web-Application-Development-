import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import LoginPage from './pages/LoginPage';
import './App.css';

interface Genre {
  id: number;
  name: string;
}

function App() {
  const [genres, setGenres] = useState<Genre[]>([]);

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

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar genres={genres} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/genre/:id" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;