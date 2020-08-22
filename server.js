// * Override process.env.* for non-PROD development:
if (process.env.NODE_ENV !== 'production')
    require('dotenv').config();

// * Create server app:
const express = require('express');
const app = express();

// * Setup view engine:
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', '_layouts/layout');
app.use(expressLayouts);
app.use('/assets', express.static('assets'));

// * DB setup:
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
const db = mongoose.connection;
db.once('open', () => console.info('[INFO] Connected to DB succesfully...'));
db.on('error', error => console.error(error));

// * Use HTTP methods overrides from HTML by special query parameter:
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// * Setup routing:
const indexRouter = require('./routes/index.routes');
const articleRouter = require('./routes/articles.routes');
const aboutRouter = require('./routes/about.routes');
const contactRouter = require('./routes/contact.routes');
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/articles', articleRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);

// * Start server:
app.listen(process.env.PORT);
