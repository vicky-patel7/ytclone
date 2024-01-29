const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    videoId: {
        type: [String],
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('History', HistorySchema);