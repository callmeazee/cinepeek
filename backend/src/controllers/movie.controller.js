const movieModel = require("../models/movie.model");

const addMovieController = async (req, res) => {
  try {
    const movie = await movieModel.create(req.body);
       res.json({
            message: "Movie added successfully", 
         movie
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMovieController = async (req, res) => {
  try {
    const movies = await movieModel.find();
       res.json({
            message: "Movies Fetched Successfully", 
         movies
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMovieController = async (req, res) => {
  try {
       const movie = await movieModel.findByIdAndUpdate(req.params.id, req.body, {
         new: true
       })
       res.json({
            message: "Movie updated Successfully",
            movie
       })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMovieController = async (req, res) => {
  try {
    const movie = await movieModel.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.json({
      message: "Movie removed successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const syncMovieController = async (req, res) => {
  try {
    const { tmdbId, title, posterPath, overview, releaseDate, rating } =
      req.body;

    // 1️⃣ Check if movie already exists
    let movie = await movieModel.findOne({ tmdbId });

    if (movie) {
      return res.json(movie);
    }

    // 2️⃣ Create new movie
    movie = await movieModel.create({
      tmdbId,
      title,
      posterPath,
      overview,
      releaseDate,
      rating,
    });

    res.status(201).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Movie sync failed",
    });
  }
};

const getMovieByTmdbIdController = async (req, res) => {
  const { tmdbId } = req.params;

  try {
    const movie = await movieModel.findOne({ tmdbId });

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching movie",
    });
  }
};


module.exports = {addMovieController, getMovieController, updateMovieController, deleteMovieController, syncMovieController, getMovieByTmdbIdController}