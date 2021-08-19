const express = require('express');
const router = express.Router();

router.get('/issue-a-book', function(req, res, next){
  res.render('admin/issue-a-book');
});

router.get('/issue-history', function(req, res, next){
  res.render('admin/issue-history');
});



module.exports = router;