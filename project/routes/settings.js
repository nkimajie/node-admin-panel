const express = require('express');
const router = express.Router();

router.get('/currency-settings', (req, res, next) => {
    res.render('admin/currency-settings');
});

router.get('/day-settings', (req, res, next) => {
    res.render('admin/day-settings');
});

module.exports = router;