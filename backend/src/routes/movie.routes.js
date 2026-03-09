const express = require('express')
const movieRouter = express.Router()

const movieController = require('../controllers/movie.controller')

const protect = require('../middleware/auth.middleware')
const adminMiddleware = require('../middleware/admin.middleware')
/* GET: /api/    get all movies*/
movieRouter.get('/', movieController.getMovieController)

//protected routes

movieRouter.post('/', protect, adminMiddleware, movieController.addMovieController)

movieRouter.put("/:id", protect, adminMiddleware, movieController.updateMovieController);

movieRouter.delete("/:id", protect,adminMiddleware, movieController.deleteMovieController);


// Sync movie from TMDB
movieRouter.post('/sync', movieController.syncMovieController)

// GET movie by TMDB ID
movieRouter.get('/tmdbId/:tmdbId', movieController.getMovieByTmdbIdController)


module.exports = movieRouter