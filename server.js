if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const articleRouter = require('./routes/articles');

// * Setup view engine:
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', '_layouts/layout');
app.use(expressLayouts);
app.use('/assets', express.static('assets'));

// * DB setup:
mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('open', () => console.info('[INFO] Connected to DB succesfully...'));
db.on('error', error => console.error(error));

// * Setup routing:
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/articles', articleRouter);

// * Start server:
app.listen(process.env.PORT);
