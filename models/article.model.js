const mongoose = require('mongoose');
const slugify = require('slugify');

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
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
});

articleSchema.pre('validate', function(next) {
    if (this.title)
        this.slug = slugify(this.title, {
            lower: true,
            strict: true
        });
    next();
});

module.exports = mongoose.model('Article', articleSchema);
