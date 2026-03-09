import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../../../themes/themeProvider";
import { useAuth } from "../../../context/AuthContext";

function Navbar() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const { toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    navigate(`/search?query=${query}`);
    setQuery("");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="logo">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#e50914">
          <path d="M12 2L2 22h20L12 2z" />
        </svg>
        Cine Peek
      </Link>

      {/* Search */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          className="search-bar"
          placeholder="Search movies, tv shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {/* Hamburger */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {/* Links */}
      <div className={`nav-links ${menuOpen ? "show" : ""}`}>
        <Link to="/">Home</Link>

        {user && <Link to="/favorites">Favorites</Link>}

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Signup</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}

        <button className="theme-toggle" onClick={toggleTheme}>
          🌙
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
