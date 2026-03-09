import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";
import { toast } from "react-toastify";
import Loader from "../../components/ui/loader/Loader";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [images, setImages] = useState([]);

  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieRes = await api.get(`/tmdb/movies/${id}`);
        setMovie(movieRes.data);

        const imageRes = await api.get(`/tmdb/movies/${id}/images`);
        setImages(imageRes.data.backdrops.slice(0, 5));

        const videoRes = await api.get(`/tmdb/movies/${id}/videos`);

        const trailerVideo = videoRes.data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube",
        );

        if (trailerVideo) {
          setTrailer(trailerVideo.key);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);


     // const addToFavorites = async () => {
     //   try {
     //     // Step 1: Save movie in DB
     //     const res = await api.post("/movies/sync", {
     //       tmdbId: movie.id,
     //       title: movie.title,
     //       posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
     //       overview: movie.overview,
     //       releaseDate: movie.release_date,
     //       rating: movie.vote_average,
     //     });

     //     const dbMovie = res.data;

     //     // Step 2: Add favorite
     //     await api.post("/favorites", {
     //       movieId: dbMovie._id,
     //     });

     //     toast.success("Added to favorites");
     //   } catch (error) {
     //     console.error(error);
     //     toast.error("Failed to add favorite");
     //   }
     // };
     // const addToFavorites = async () => {
     //   try {
     //     // Step 1 — Sync movie to DB
     //     await api.post("/movies/sync", {
     //       tmdbId: movie.id,
     //       title: movie.title,
     //       posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
     //       overview: movie.overview,
     //       releaseDate: movie.release_date,
     //       rating: movie.vote_average,
     //     });

     //     // Step 2 — Add favorite
     //     await api.post("/favorites", {
     //       tmdbId: movie.id,
     //     });

     //     toast.success("Added to favorites");
     //   } catch (error) {
     //     console.error(error);
     //     toast.error("Failed to add favorite");
     //   }
     // };
     // const addToFavorites = async () => {
     //      try {
     //        console.log("sending fav req")
     //     // 1️⃣ Sync movie into DB
     //     await api.post("/movies/sync", {
     //       tmdbId: movie.id,
     //       title: movie.title,
     //       posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
     //       overview: movie.overview,
     //       releaseDate: movie.release_date,
     //       rating: movie.vote_average,
     //     });

     //     // 2️⃣ Add favorite
     //     await api.post("/favorites", {
     //       tmdbId: movie.id,
     //     });
     //           console.log(res.data)

     //     toast.success("Added to favorites");
     //   } catch (error) {
     //     console.error(error);

     //     toast.error("Failed to add favorite");
     //   }
     // };


     const addToFavorites = async () => {
       try {
         // Step 1: Sync movie to DB
         await api.post("/movies/sync", {
           tmdbId: movie.id,
           title: movie.title,
           posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
           overview: movie.overview,
           releaseDate: movie.release_date,
           rating: movie.vote_average,
         });

         // Step 2: Add favorite
         const res = await api.post("/favorites", {
           tmdbId: movie.id,
         });

         console.log(res.data);

         toast.success("Added to favorites");
       } catch (error) {
         console.error(error);
         toast.error("Failed to add favorite");
       }
     };

  if (loading) return <Loader />;

  if (!movie) return <p>Movie not found</p>;

  return (
    <div className="movie-details container">
      <div className="details-top">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.title}
        />

        <div className="details-info">
          <h1>{movie.title}</h1>

          <p>{movie.overview}</p>

          <p>
            <b>Release Date:</b> {movie.release_date}
          </p>

          <p>
            <b>Rating:</b> {movie.vote_average}
          </p>

          <div className="details-buttons">
            <button className="primary-btn" onClick={addToFavorites}>
              Add to Favorites
            </button>

            {trailer && (
              <button
                className="secondary-btn"
                onClick={() => setShowTrailer(true)}>
                Watch Trailer
              </button>
            )}
          </div>
        </div>
      </div>

      <h2>Images</h2>

      <div className="image-gallery">
        {images.map((img) => (
          <img
            key={img.file_path}
            src={`https://image.tmdb.org/t/p/w500${img.file_path}`}
            alt="movie"
          />
        ))}
      </div>

      {showTrailer && (
        <div className="trailer-modal">
          <div className="trailer-content">
            <button className="close-btn" onClick={() => setShowTrailer(false)}>
              Close
            </button>

            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${trailer}`}
              title="Trailer"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
