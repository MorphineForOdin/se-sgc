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
db.once('open', () => console.info('[INFO]: Connected to DB succesfully...'));
db.on('error', error => console.error(`[ERROR]: ${error}`));

// * Use HTTP methods overrides from HTML by special query parameter:
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// * Setup routing:
app.use(express.urlencoded({ extended: false }));
const indexRouter = require('./routes/index.routes');
app.use('/', indexRouter);
const guidesRouter = require('./routes/guides.routes');
app.use('/guides', guidesRouter);
const basesRouter = require('./routes/bases.routes');
app.use('/bases', basesRouter);
const articleRouter = require('./routes/articles.routes');
app.use('/articles', articleRouter);
const productsRouter = require('./routes/products.routes');
app.use('/products', productsRouter);
const aboutRouter = require('./routes/about.routes');
app.use('/about', aboutRouter);

// * Start server:
app.listen(process.env.PORT);
