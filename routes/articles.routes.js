const express = require('express');
const router = express.Router();
const Article = require('./../models/article.model');

router.get('/', (req, res) => res.render('articles/index'));

router.get('/new', (req, res) => res.render('articles/new', { article: new Article() }));

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('articles/edit', { article: article });
});

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) res.redirect('/');
    res.render('articles/blog', { article: article });
});

router.post('/', (req, res, next) => {
    req.article = new Article();
    next();
}, saveArticleAndRedirectTo('new'));

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
}, saveArticleAndRedirectTo('edit'));

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

function saveArticleAndRedirectTo(path) {
    return async (req, res) => {
        let article = req.article;
        article.title = req.body.title;
        article.description = req.body.description;
        article.markdown = req.body.markdown;
        try {
            article = await article.save();
            res.redirect(`/articles/${article.slug}`);
        } catch (error) {
            console.error(error);
            res.render(`/articles/${path}`, { article: createdArticle });
        }
    };
}

module.exports = router;
