const mongoose = require('mongoose');

const favoriteMovieSchema = new mongoose.Schema({
    userId: {  
        type: String,
        required: true,
        index: true
    },
    tmdb_id: {
        type: Number,
        required: true,
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

favoriteMovieSchema.index({ userId: 1, tmdb_id: 1 }, { unique: true });

const FavoriteMovie = mongoose.model('FavoriteMovie', favoriteMovieSchema);

module.exports = FavoriteMovie;