const favoriteModel = require("../models/favorite.model");
const movieModel = require("../models/movie.model");

const addFavoriteController = async (req, res) => {
  try {
    const { tmdbId } = req.body;
    const userId = req.user._id;

    // check if movie exists in database
    let movie = await movieModel.findOne({ tmdbId });

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found in database. Sync movie first.",
      });
    }

    // check if already favorite
    const existingFavorite = await favoriteModel.findOne({
      user: userId,
      movie: movie._id,
    });

    if (existingFavorite) {
      return res.json({
        message: "Movie already in favorites",
      });
    }

    const favorite = await favoriteModel.create({
      user: userId,
      movie: movie._id,
    });

    res.json({
      message: "Movie added to favorites",
      favorite,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getFavoritesController = async (req, res) => {
  try {
    const favorites = await favoriteModel
      .find({ user: req.user._id })
      .populate("movie");

    res.json({
      favorites,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const removeFavoriteController = async (req, res) => {
  try {
    const favorite = await favoriteModel.findByIdAndDelete(req.params.id);

    res.json({
      message: "Favorite removed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addFavoriteController,
  getFavoritesController,
  removeFavoriteController,
};
