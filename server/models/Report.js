const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    desc : {
        type : String,
    },
    category : {
        type : String
    }
}, { timestamps: true });

module.exports = mongoose.model('Report', ReportSchema);