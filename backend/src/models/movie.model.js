const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({

    tmdbId: {
      type: Number,
      required: true,
      unique: true, // We don't want to save the same movie twice in our database
    },
    title: {
      type: String,
      required: true,
    },
    posterPath: {
      type: String, // This will be the image URL string
    },
    overview: {
      type: String,
    },
    releaseDate: {
      type: String,
    },
    rating: {
      type: Number,
    }
  },
  {
    timestamps: true,
  }
)

const movieModel = mongoose.model('movie', movieSchema)

module.exports = movieModel