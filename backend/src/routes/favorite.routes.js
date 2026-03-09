const express = require("express");

const favoriteRouter = express.Router();

const protect = require("../middleware/auth.middleware");

const favoriteController = require("../controllers/favorite.controller");

favoriteRouter.post("/", protect, favoriteController.addFavoriteController);

favoriteRouter.get("/", protect, favoriteController.getFavoritesController);

favoriteRouter.delete(
  "/:id",
  protect,
  favoriteController.removeFavoriteController,
);

module.exports = favoriteRouter;
