const fetchFromTMDB = require("../services/tmdbServices");

//r/trending/movie/day
const getTrendingMovies = async (req, res) => {
  try {
    const data = await fetchFromTMDB("/trending/movie/day");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trending movies" });
  }
};

///movie/popular

const getPopularMovies = async (req, res) => {
  const page = req.query.page || 1;

  try {
    const data = await fetchFromTMDB(`/movie/popular?page=${page}`);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch popular movies",
    });
  }
};
///discover/movie

const getMovies = async (req, res) => {
     try {
       const page = req.query.page || 1
    const data = await fetchFromTMDB(`/discover/movie?page=${page}`);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch movies" });
  }
};

// /discover/tv
const getTvShows = async (req, res) => {
  try {
    const data = await fetchFromTMDB(`/discover/tv?page=${page}`);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tv shows" });
  }
};

///person/popular

const getPopularPeople = async (req, res) => {
  try {
    const data = await fetchFromTMDB("/person/popular");

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch people" });
  }
};

///search/multi
//GET /api/tmdb/search?query=batman

const searchMulti = async (req, res) => {
  const { query } = req.query;

  try {
    const data = await fetchFromTMDB(`/search/multi?query=${query}`);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
};

///movie/{id}

const getMovieDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(`/movie/${id}`);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Movie details fetch failed" });
  }
};

///movie/{id}/images
const getMovieImages = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(`/movie/${id}/images`);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch images" });
  }
};

const getMovieVideos = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(`/movie/${id}/videos`);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch videos",
    });
  }
};

module.exports = {getTrendingMovies, getPopularMovies, getMovies, getMovieDetails,getTvShows, searchMulti, getPopularPeople, getMovieImages, getMovieVideos}