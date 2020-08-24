const express = require('express');
const router = express.Router();
const Article = require('./../models/article.model');

const marked = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const domPurify = createDomPurify(new JSDOM().window);

router.get('/', (req, res) => res.render('articles/index'));

router.get('/new', (req, res) => res.render('articles/new', { article: new Article() }));

router.get('/edit/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) res.redirect('/');
        res.render('articles/edit', { article: article });   
    } catch (error) {
        res.redirect('/');
    }
});

router.get('/:slug', async (req, res) => {
    try {
        const article = await Article.findOne({ slug: req.params.slug });
        if (!article || !article.markdown) res.redirect('/');
        res.render('articles/blog', {
            article: article,
            sanitizedHtml: domPurify.sanitize(marked(article.markdown))
        });
    } catch (error) {
        res.redirect('/');
    }
});

router.post('/', (req, res, next) => {
    req.article = new Article();
    next();
}, saveArticleAndRedirectTo('new'));

router.put('/:id', async (req, res, next) => {
    try {
        req.article = await Article.findById(req.params.id);   
    } catch (error) {
        req.article = new Article();
    }
    next();
}, saveArticleAndRedirectTo('edit'));

router.delete('/:id', async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.redirect('/');   
    }
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
