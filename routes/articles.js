const express = require('express');
const router = express.Router();
const Article = require('./../models/article');

router.get('/', (req, res) => res.render('articles/index'));
router.post('/', async (req, res) => {
    const article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });
    try {
        let createdArticle = await article.save();
        res.redirect(`/articles/${createdArticle.id}`);
    } catch (error) {
        // TODO: Hadle creation errors.
        res.render('/articles/new', {
            article: createdArticle
        });
    }
});
router.get('/new', (req, res) => res.render('articles/new'));
router.get('/:id', (req, res) => res.render('articles/blog'));

module.exports = router;