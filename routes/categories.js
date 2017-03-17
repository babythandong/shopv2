var express = require('express');
var router = express.Router();
var Category = require('../models/category');

router.get('/', function(req, res) {

    var page = req.param('page') || 1;
    Category.paginate({ limit: 3, page: page }, function(error, categories) {
        if (error) {
            console.error(error);
        } else {
            res.render('private/category/index', { title: 'Country List', categories: categories });
        }
    });
});
router.get('/add', function(req, res) {
    if (!req.session.user) {
        res.redirect('/users/login');
    } else {
        Category.getCategoryParent(function(err, categories) {
            if (err) return err;
            console.log('Session: ' + req.session.user);
            res.render('private/category/add', { title: 'Add Category', categories: categories });
        });
    }
});
router.post('/add', function(req, res) {
    var name = req.body.name;
    var parent = req.body.parent;
    var description = req.body.description;
    var cate = new Category({
        name: name,
        parent: parent,
        description: description,
        create: new Date()
    })
    Category.createCategory(cate, function(err, newcategory) {
        if (err) return err;
        req.flash('success', 'Category is created');
        res.location('/categories');
        res.redirect('/categories');
    });
});
router.get('/edit/:id', function(req, res) {
    var id = req.params.id;
    Category.getCategoryById(id, function(errr, category) {
        Category.getCategoryParent(function(er, categories) {
            res.render('private/category/edit', { 'title': category.name, 'cate': category, 'categories': categories });
        });
    });
});
router.post('/edit/:id', function(req, res) {
    var id = req.params.id;
    var name = req.body.name;
    var parent = req.body.parent;
    var description = req.body.description;
    req.checkBody('name', 'Name field is required').notEmpty();
    req.checkBody('parent', 'Parent field is required').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        res.render('private/category/edit', { 'errors': errors });
    } else {
        Category.editCategoryById(id, { name: name, parent: parent, description: description }, function(err, newCate) {
            if (err) return err;
            req.flash('success', 'Updated');
            res.location('/categories');
            res.redirect('/categories');
        });
    }
});
router.post('/del/:id', function(req, res) {
    var id = req.params.id;
    Category.getCategoryById(id, function(err, cate) {
        if (err) return err;
        if (!user) {
            res.status(404).send();
        } else {
            Category.removeById(id, function(err, status) {
                if (err) return err;
                req.flash('success', 'Remove success');
                res.location('/categories');
                res.redirect('/categories');
            });
        }
    });
});

module.exports = router;