const express = require('express')

const TMDBRouter = express.Router()
const TMDBController = require('../controllers/tmdb.controller')

TMDBRouter.get('/trending', TMDBController.getTrendingMovies)

TMDBRouter.get("/popular", TMDBController.getPopularMovies);

TMDBRouter.get("/movies", TMDBController.getMovies);

TMDBRouter.get("/tv", TMDBController.getTvShows);

TMDBRouter.get("/people", TMDBController.getPopularPeople);


TMDBRouter.get("/search", TMDBController.searchMulti);


TMDBRouter.get("/movies/:id", TMDBController.getMovieDetails);


TMDBRouter.get("/movies/:id/images", TMDBController.getMovieImages);

TMDBRouter.get("/movies/:id/videos", TMDBController.getMovieVideos);


module.exports = TMDBRouter