const express = require('express');
const router = express.Router();

// TODO: Get data from DB.
function getRecentArticles(take) {
    let articles = [];
    while (take > 0)
        articles.push({
            title: `Title ${--take}`,
            createdDate: new Date(),
            description: `Description ${take}`
        });
    return articles;
}
router.get('/', (req, res) => res.render('index', {
    articles: getRecentArticles(10)
}));

module.exports = router;