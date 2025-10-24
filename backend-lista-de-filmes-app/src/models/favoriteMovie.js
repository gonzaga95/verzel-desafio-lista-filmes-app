const mongoose = require('mongoose');

const favoriteMovieSchema = new mongoose.Schema({
    tmdb_id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    addDate: {
        type: Date,
        default: Date.now,
    },
});

const FavoriteMovie = mongoose.model('FavoriteMovie', favoriteMovieSchema);

module.exports = FavoriteMovie;