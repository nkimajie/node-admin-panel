const express = require('express');
const router = express.Router();

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
//load model
const userModel = require('../models').User;

/* GET users listing. */
router.route('/add-user').get(function(req, res, next) {
  res.render('admin/add-user');
}).post((req, res, next) => {

  //check if email exist
  userModel.findOne({
    where:{
      email:{
        [Op.eq]: req.body.email
      }
    }
  }).then((data) => {

    if(data){

      req.flash("error", "Email address already exist");
      res.redirect("/admin/add-user");

    }else{

      userModel.create({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        gender: req.body.dd_gender,
        address: req.body.address,
        status: req.body.status,
      }).then((status) => {
        if(status){
          req.flash("success", "User has been created");
          res.redirect("/admin/add-user");
        }else{
          req.flash("error", "Failed to save users");
          res.redirect("/admin/add-user");
        }
      });

    }
  })
  
});

router.get('/list-user', function(req, res, next) {
  res.render('admin/list-user');
});

module.exports = router;
