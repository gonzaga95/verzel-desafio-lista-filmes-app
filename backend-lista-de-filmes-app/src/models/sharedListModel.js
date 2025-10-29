const mongoose = require('mongoose');
const crypto = require('crypto');

const sharedListSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    shareToken: {
        type: String,
        required: true,
        unique: true,
        default: () => crypto.randomUUID()
    },
    isActive: {
        type: Boolean,
        default: true
    },
    listName: {
        type: String,
        required: true
    }
});

const SharedList = mongoose.model('SharedList', sharedListSchema);

module.exports = SharedList;