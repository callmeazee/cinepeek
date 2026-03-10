import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const imagePath = movie.poster_path || movie.profile_path;

  const image = imagePath
    ? `https://image.tmdb.org/t/p/w500${imagePath}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  const title = movie.title || movie.name;

  return (
    <div className="movie-card">
      <Link
        to={
          // movie.media_type === "person"
          movie.profile_path
            ? "#"
            : `/movie/${movie.id}`
        }>
        <img src={image} alt={title} />

        <h4>{title}</h4>
        <p className="rating">
          ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
        </p>
      </Link>
    </div>
  );
}

export default MovieCard;
