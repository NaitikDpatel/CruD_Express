const Category = require('../model/categoryModel');
const session = require('express-session');
const News = require('../model/newsModel');
const multer = require('multer');
const path = require('path');

const getIndexPage = (req, res) => {
    res.render('index');
};

const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No image uploaded.');
    }

    // Do any additional processing with the uploaded file here, if needed

    // Respond with a success message
    res.send('Image uploaded successfully.');
};


// Home Page
const showHome = async (req, res) => {
    // if (!req.session.username) {
    //     res.redirect("/login");
    // }
    // else {
    //     res.render("index",{
    //         username: "Welcome " + req.session.username,
    //         users:req.session.username
    //     });
    // }
    res.render("index");
}

const news = async (req, res) => {
    const data = await Category.find();
    const newsData = await News.find().populate('category_id','categoryName');
    res.render("news", {
        news: newsData,
        category: data,
    });
}

// Admin page
const showAdmin = async (req, res) => {
    // if (!session.username) {
    //     res.redirect("/login");
    // }
    // else {
    const categoryDetail = await Category.find()
    res.render("Admin", {
        name: "Display",
        // users:session.username,
        category: categoryDetail,
    });
    // }
    // res.render("Admin");
}

// Delete Category
const deleteCategory = async (req, res) => {
    let id = req.params.id;
    const show = await Category.findByIdAndDelete(id)
    res.redirect('/dashboard');
}

// Add Category
const addCategory = async (req, res) => {
    const AddCategory = await new Category({
        categoryName: req.body.cname,
        description: req.body.des,
        title: req.body.title,
    })
    AddCategory.save();
    res.redirect('/dashboard');
}

// Edit Category
const editCategory = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const updateData = await Category.findByIdAndUpdate(id, {
        category: req.body.category,
        description: req.body.des,
        title: req.body.title
    })
    res.render('Admin');
}

const addNews = async (req, res) => {
    const AddNews = await new News({
        title: req.body.title,
        author: req.body.author,
        description: req.body.desc,
        image: req.file.filename,
        category_id: req.body.catename
    })
    AddNews.save();
    res.redirect('/news');
}

const deleteNews = async (req, res) => {
    let id = req.params.id;
    const show = await News.findByIdAndDelete(id)
    res.redirect('/news');
}

module.exports = {
    showHome,
    showAdmin,
    deleteCategory,
    addCategory,
    editCategory,
    news,
    addNews,
    deleteNews,
    getIndexPage,
    uploadImage
}