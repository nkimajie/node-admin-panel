const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//model
const bookModel = require('../models').Book;
const categoryModel = require('../models').category;

router.route("/add-book").get(async (req, res, next) => {
    var categories = await categoryModel.findAll({
        where: {
            status:{
                [Op.eq]: '1'
            }
        }
    })
    res.render('admin/add-book', {
        categories: categories
    });
}).post((req, res, next) => {


    if(!req.files){
        req.flash("error", "Please upload some file");
    }else{
        let image_attr = req.files.cover_image;
        let valid_images_extensions = ["image/png", "image/jpg", "image/jpeg"];

        if(valid_images_extensions.includes(image_attr.mimetype)){

            image_attr.mv("./public/uploads/" + image_attr.name);

            bookModel.create({
                name : req.body.name,
                categoryId : req.body.categoryId,
                description : req.body.description,
                amount : req.body.amount,
                cover_image : "/uploads/"+image_attr.name,
                author : req.body.author,
                status : req.body.status,
            }).then((data)=>{
                if(data){
                    req.flash("success", "Book has been created");
                }else{
                    req.flash("error", "Failed to create book");

                }

                res.redirect("/admin/add-book")
            })

        }else{

            req.flash("error", "Invalid cover image selected");
            res.redirect("/admin/add-book");

        }

        
    }
})

router.get("/list-book", async (req, res, next) => {
    let books = await bookModel.findAll({
        include: {
            model: categoryModel,
            attributes: ['name']
        }
    });

    // res.json(books);
    res.render('admin/list-book', {
        books:books
    });
});

router.route("/edit-book/:bookId").get(async function(req, res, next){
    let book_data = await bookModel.findOne({
        where:{
            id:{
                [Op.eq]: req.params.bookId
            }
        }
    });
    let categories = await categoryModel.findAll({
        where: {
            status:{
                [Op.eq]: '1'
            }
        }
    })
    res.render("admin/edit-book",{
        book: book_data,
        categories: categories
    });
}).post(async (req, res, next) => {

    if(!req.files){

        bookModel.update({
            name : req.body.name,
                categoryId : req.body.categoryId,
                description : req.body.description,
                amount : req.body.amount,
                author : req.body.author,
                status : req.body.status,
        }, {
            where: {
                id: {
                    [Op.eq]: req.params.bookId
                }
            }
        }).then((data) => {
            if(data){
                req.flash("success", "Book has been updated");
            }else{
                req.flash("error", "Failed to update book");

            }

            res.redirect("/admin/edit-book/"+req.params.bookId)
        })
    }else{

        let image_attr = req.files.cover_image;
        let valid_images_extensions = ["image/png", "image/jpg", "image/jpeg"];

        if(valid_images_extensions.includes(image_attr.mimetype)){

            image_attr.mv("./public/uploads/" + image_attr.name);

            bookModel.update({
                name : req.body.name,
                categoryId : req.body.categoryId,
                description : req.body.description,
                amount : req.body.amount,
                cover_image : "/uploads/"+image_attr.name,
                author : req.body.author,
                status : req.body.status,
            }, {
                where:{
                    id: {
                        [Op.eq]: req.params.bookId
                    }
                }
            }).then((data)=>{
                if(data){
                    req.flash("success", "Book has been updated");
                }else{
                    req.flash("error", "Failed to update book");

                }

                res.redirect("/admin/edit-book/"+req.params.bookId);
            })

        }else{

            req.flash("error", "Invalid cover image selected");
            res.redirect("/admin/edit-book/"+req.params.bookId);

        }

    }
})

router.post('/delete-book/:bookID', (req, res, next) => {
    bookModel.findOne({
        where: {
            id:{
                [Op.eq]: req.body.book_id
            }
        }
    }).then((data) => {
        if(data){
            bookModel.destroy({
                where:{
                    id:{
                        [Op.eq]: req.body.book_id
                    }
                }
            }).then((status) => {
                if(status){
                    req.flash("success", "Book has been deleted");
                    res.redirect("/admin/list-book");
                }else{
                    req.flash("error", "Failed to delete book");
                    res.redirect("/admin/list-book");
                }
            })
        }else{
            req.flash("error", "Book not found");
            res.redirect("/admin/list-book");
        }
    })
})

module.exports = router;