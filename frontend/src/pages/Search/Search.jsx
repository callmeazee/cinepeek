import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import api from "../../services/api";
import MovieCard from "../../components/movie/MovieCard/MovieCard";
import Loader from "../../components/ui/loader/Loader";


function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchMovies = async () => {
      try {
        const res = await api.get(`/tmdb/search?query=${query}`);

        setResults(res.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      searchMovies();
    }
  }, [query]);

  return (
    <div className="container">
      <h2>Search Results for "{query}"</h2>

            {loading ? (<Loader />
            
            
            ): ( <div className="movie-grid">

          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}

        </div>
      )}

    </div>)
        
     }



export default Search;
