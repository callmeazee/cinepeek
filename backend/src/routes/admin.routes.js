const express = require("express");
const adminRouter = express.Router();

const protect = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");

const movieModel = require("../models/movie.model");
const userModel = require("../models/user.model");

adminRouter.get("/movies", protect, adminOnly, async (req, res) => {
  const movies = await movieModel.find();

  res.json(movies);
});

adminRouter.delete("/movies/:id", protect, adminOnly, async (req, res) => {
  await movieModel.findByIdAndDelete(req.params.id);

  res.json({
    message: "Movie deleted",
  });
});

adminRouter.get("/users", protect, adminOnly, async (req, res) => {
  const users = await userModel.find();

  res.json(users);
});

module.exports = adminRouter;
