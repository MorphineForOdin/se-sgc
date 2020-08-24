const express = require('express');
const router = express.Router();
const Article = require('./../models/article.model');

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

router.get('/login', (req, res) => res.render('login'));

router.post('/login', (req, res) => {
    console.log(req);
});

router.get('/register', (req, res) => res.render('register'));

router.post('/register', (req, res) => {
    console.log(req);
});

module.exports = router;