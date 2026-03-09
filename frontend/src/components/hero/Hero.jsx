import { useEffect, useState } from "react";
import api from "../../services/api";

function Hero() {
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await api.get("/tmdb/trending");

        const randomMovie =
          res.data.results[Math.floor(Math.random() * res.data.results.length)];

        setMovie(randomMovie);

        const videoRes = await api.get(`/tmdb/movies/${randomMovie.id}/videos`);

        const trailerVideo = videoRes.data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube",
        );

        if (trailerVideo) {
          setTrailer(trailerVideo.key);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchHero();
  }, []);

  if (!movie) return null;

  return (
    <div className="hero">
      {trailer && (
        <iframe
          className="hero-video"
          src={`https://www.youtube.com/embed/${trailer}?autoplay=1&mute=1&controls=0&loop=1`}
          title="Trailer"
          allow="autoplay"
        />
      )}

      <div className="hero-content">
        <h1>{movie.title}</h1>

        <p>{movie.overview}</p>
      </div>
    </div>
  );
}

export default Hero;
