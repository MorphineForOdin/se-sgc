const express = require('express');
const app = express();
const articleRouter = require('./routes/articles');

app.set('view engine', 'ejs');
app.use('/articles', articleRouter);

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
app.get('/', (req, res) => res.render('index', {
    articles: getRecentArticles(10)
}));

app.listen(5000);