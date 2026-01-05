import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

interface NavbarProps {
  genres: Array<{ id: number; name: string }>;
}

export default function Navbar({ genres }: NavbarProps) {
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          MOVIEFLIX
        </Link>

        <div className="navbar-right">
          {/* Hamburger Menu for Genres */}
          <div className="menu-wrapper">
            <button
              className="hamburger-btn"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span>หมวดหมู่</span>
            </button>
            {menuOpen && (
              <div className="genre-menu">
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  ทั้งหมด
                </Link>
                {genres.map((genre) => (
                  <Link
                    key={genre.id}
                    to={`/genre/${genre.id}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Login/Logout Button */}
          {isAuthenticated ? (
            <button className="auth-btn" onClick={handleLogout}>
              ออกจากระบบ
            </button>
          ) : (
            <button className="auth-btn" onClick={() => navigate('/login')}>
              เข้าสู่ระบบ
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
