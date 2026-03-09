import { useEffect, useState } from "react";
import api from "../../services/api";

import MovieCard from "../../components/movie/MovieCard/MovieCard";

import { toast } from "react-toastify";
import Loader from "../../components/ui/loader/Loader";
import { useAuth } from "../../context/AuthContext";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
   const {user} = useAuth()
  const fetchFavorites = async () => {
    try {
      const res = await api.get("/favorites");

      setFavorites(res.data.favorites);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

     useEffect(() => {
          if (user) {
            
               fetchFavorites();
       }
  }, [user]);

  const removeFavorite = async (id) => {
    try {
      await api.delete(`/favorites/${id}`);

      toast.success("Removed from favorites");

      setFavorites((prev) => prev.filter((fav) => fav._id !== id));
    } catch (error) {
      toast.error("Failed to remove favorite");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container">
      <h2>My Favorites</h2>

      {favorites.length === 0 && <p>No favorite movies yet.</p>}

      <div className="movie-grid">
        {favorites.map((fav) => (
          <div key={fav._id} className="favorite-card">
            <MovieCard
              movie={{
                ...fav.movie,
                poster_path: fav.movie.posterPath,
              }}
            />

            <button
              className="remove-btn"
              onClick={() => removeFavorite(fav._id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
