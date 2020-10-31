const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => res.render('about/index'));

router.get('/styles', (req, res) => res.render('about/styles'));

module.exports = router;