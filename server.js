const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('SE-SGC');
})
app.listen(5000);