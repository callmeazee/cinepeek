const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
          ref: "User",
     required: true
     },
         movie: {
      type: mongoose.Schema.Types.ObjectId,
              ref: "Movie",
      required: true
    },
  movieId: String,
});

const favoriteModel = mongoose.model('favorite', favoriteSchema)

module.exports = favoriteModel