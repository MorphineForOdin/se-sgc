const express = require('express');
const router = express.Router();
const Article = require('./../models/article.model');

router.get('/', async (req, res) => {
    const articles = await Article
        .find()
        .sort({ createdDate: 'desc' })
        .limit(10);
    res.render('index', { articles: articles });
});

module.exports = router;