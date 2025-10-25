const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

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
        default: () => uuidv4()
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