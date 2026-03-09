const favoriteModel = require("../models/favorite.model");

async function addFavorite(req, res) {
  const favorite = await favoriteModel.create({
    user: req.user._id,
    mavie: req.body.movieId,
  });
  res.json({
    message: "added to favorites",
    favorite,
  });
}

async function getFavorites(req, res) {
  const favorites = await favoriteModel
    .find({ user: req.user._id })
    .populate("movie");
  res.json({
    message: "fetched favorites successfully",
    favorites,
  });
}

async function removeFavorites(req, res) {
  await favoriteModel.findByIdAndDelete(req.params.id);
  res.json({ message: "favorite removed successfully" });
}

module.exports = { addFavorite, getFavorites, removeFavorites };
