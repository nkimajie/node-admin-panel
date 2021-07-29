const express = require("express");
const router = express.Router();

router.get("/admin", (req, res, next) => {
    res.render('admin/dashboard');
});

module.exports = router;