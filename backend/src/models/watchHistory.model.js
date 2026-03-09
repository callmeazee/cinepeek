const mongoose = require("mongoose");

const watchHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },

  watchedAt: {
    type: Date,
    default: Date.now,
  },
});

const watchHistoryModel = mongoose.model("WatchHistory", watchHistorySchema);

module.exports = watchHistoryModel
