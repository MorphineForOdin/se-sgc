const express = require('express');
const router = express.Router();
const Article = require('./../models/article.model');

// * LANDING PAGE:
router.get('/', async (req, res) => {
    try {
        const articles = await Article
            .find()
            .sort({ createdDate: 'desc' })
            .limit(10);
        res.render('index', { articles: articles, searchQueryTitle: null });
    } catch (error) {
        console.error(error);
        res.render('index', { articles: [], searchQueryTitle: null });
    }
});

module.exports = router;