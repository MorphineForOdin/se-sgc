const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: () => new Date()
    }
});

module.exports = mongoose.model('Article', articleSchema);
