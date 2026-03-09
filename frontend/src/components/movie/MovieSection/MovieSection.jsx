import { useEffect, useState } from "react";
import api from "../../../services/api";

import MovieCard from "../MovieCard/MovieCard";
import Loader from "../../ui/loader/Loader";

function MovieSection({ title, endpoint }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get(endpoint);

        setMovies(res.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [endpoint]);

  if (loading) return <Loader />;

  return (
    <div className="movie-section">
      <h2>{title}</h2>

      <div className="movie-slider">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieSection;
