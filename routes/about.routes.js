const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => res.render('about/index'));

module.exports = router;