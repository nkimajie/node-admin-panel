const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op; //op stands for sequelize operator

//load model
const categoryModel = require("../models").category;

// const cat = require("../models").category;

router.route("/admin/add_category").get((req, res, next) => {
    res.render('admin/add_category');
}).post((req, res, next) => {

    //check if category exist
    categoryModel.findOne({
        where:{
            name:{
                [Op.eq]: req.body.name // eq stands for equal too
            }
        }
    }).then((data) => {
        if(data){

            req.flash("error", "Category already exist");
            res.redirect("/admin/add_category");

        }else{

            categoryModel.create({
                name: req.body.name,
                status: req.body.status
            }).then((category) => {
                if(category){
                    req.flash("success", "Category created successfully");
                    res.redirect("/admin/add_category");
                }else{
                    req.flash("error", "Failed to created category");
                    res.redirect("/admin/add_category");
                }
                
            });

        }
    });

    
});


router.get("/admin/list-category", async (req, res, next) => {

    let all_categories = await categoryModel.findAll();
    res.render('admin/list-category', {
        categories: all_categories
    });
});

router.route("/admin/edit-category/:categoryId").get((req, res, next) => {

    categoryModel.findOne({
        where:{
            id:{
                [Op.eq]: req.params.categoryId
            }
        }
    }).then((data) => {
        res.render("admin/edit-category", {
            category: data
        }); 
    })
    
}).post((req, res, next) => {
    categoryModel.findOne({
        where: {
            [Op.and]: [
                {
                    id: {
                        [Op.ne]: req.params.categoryId //ne means not equal to
                    }
                },
                {
                    name: {
                        [Op.eq]: req.body.name // eq stands for equal to
                    }
                }
            ]
        }
    }).then((data) => {
        if(data){
            // category already exists
            req.flash('error', "Category already exists");
            res.redirect("/admin/edit-category/"+req.params.categoryId);
        }else{
            //category doesnot exists
            categoryModel.update({
                name: req.body.name,
                status: req.body.status
            }, {
                where: {
                    id: req.params.categoryId
                }
            }).then((data) => {
                if(data){
                    req.flash("success", "Category has been updated");
                }else{
                    req.flash("erroe", "Failed to update category");
                }

                res.redirect("/admin/edit-category/"+req.params.categoryId);
            })

        }
    })
});

router.post("/admin/delete-category", (req, res, next) => {
    categoryModel.findOne({
        where:{
            id:{
                [Op.eq]: req.body.category_id
            }
        }
    }).then((data) => {
        if(data){
             categoryModel.destroy({
                 where:{
                     id:{
                         [Op.eq]: req.body.category_id
                     }
                 }
             }).then((status) => {
                 if(status){
                    req.flash("success", "Category has been deleted successfully");

                 }else{
                    req.flash("error", "Category could not be deleted");
                 }
                 res.redirect("/admin/list-category");
             })
        }else{

        }
    })
})

module.exports = router;