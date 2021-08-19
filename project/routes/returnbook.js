const express = require('express');
const router = express.Router();

router.get('/return-a-book', (req, res, next) => {
    res.render('admin/return-a-book');
});

router.get('/return-history', (req, res, next) => {
    res.render('admin/return-list');
});


module.exports = router;