const express = require('express');
const router = express.Router();
const Article = require('./../models/article.model');

router.get('/', (req, res) => res.render('articles/index'));
router.post('/', async (req, res) => {
    let createdArticle = {};
    const article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });
    try {
        createdArticle = await article.save();
        res.redirect(`/articles/${createdArticle.slug}`);
    } catch (error) {
        // TODO: Hadle creation errors.
        console.error(error);
        res.render('/articles/new', { article: createdArticle });
    }
});
router.get('/new', (req, res) => res.render('articles/new', { article: new Article() }));
router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) res.redirect('/');
    res.render('articles/blog', { article: article });
});

module.exports = router;