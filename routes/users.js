var express = require('express');
var router = express.Router();
var User = require('../models/user');
/* GET users listing. */
router.get('/signup', function(req, res) {
    res.render('signup/index', { title: 'Signup' });
});
router.post('/signup', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    req.checkBody('name', 'Name field is required').notEmpty();
    req.checkBody('email', 'Email field is require').notEmpty();
    req.checkBody('email', 'Email field is valid').isEmail();
    var errors = req.validationErrors();
    if (errors) {
        res.render('signup/index', { 'title': 'Signup', 'errors': errors });
    } else {
        var user = new User({
            name: name,
            email: email,
            password: password,
            createAt: new Date()
        });
        User.createUser(user, function(err, newUser) {
            if (err) return err;
            req.flash('success', 'User is created');
            res.location('/users/login');
            res.redirect('/users/login');
        });
    }
});
router.get('/login', function(req, res) {
    if (!req.session.user) {
        res.render('login/index', { title: 'Login' });
    } else {
        res.render('/dashboard', { title: 'DashBoard' });
    }
});
router.post('/login', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    User.getUserByEmail(email, function(err, newUser) {
        if (err) return err;
        if (!newUser) {
            return res.status(404).send();
        } else {
            User.comparePassword(password, newUser.password, function(err, isMatch) {
                if (err) return err;
                if (isMatch) {
                    req.session.user = newUser;
                    res.location('/users');
                    res.redirect('/users');
                }
            });
        }
    });
});
router.get('/', function(req, res) {
    User.getAllUser(function(err, users) {
        if (err) return err;
        res.render('private/user/index', { 'title': 'Users', 'users': users });
    })

});
router.get('/add', function(req, res) {
    res.render('private/user/add', { 'title': 'Add User' });
});
router.post('/add', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var point = req.body.point;
    req.checkBody('name', 'Name field is required').notEmpty();
    req.checkBody('email', 'Email field is required').notEmpty();
    req.checkBody('email', 'Email field is valid').isEmail();
    var errors = req.validationErrors();
    if (errors) {
        req.render('private/user/add', { title: 'Add User', 'errors': errors });
    } else {
        var newUser = new User({
            name: name,
            email: email,
            password: password,
            point: point,
            createAt: new Date()
        });
        User.createUser(newUser, function(err, user) {
            if (err) return err;
            req.flash('success', 'User is created');
            res.location('/users');
            res.redirect('/users');
        })
    }
});
router.get('/edit/:id', function(req, res) {
    var id = req.params.id;
    User.getUserById(id, function(err, user) {
        if (err) {
            return err;
        } else {
            console.log(user.name);
            res.render('private/user/edit', { 'title': 'Edit User', 'user': user });
        }
    })
});
router.post('/edit/:id', function(req, res) {
    var id = req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var point = req.body.point;
    User.updateUserById(id, { name: name, email: email, point: point, createAt: new Date() }, function(err, newUser) {
        if (err) return err;
        req.flash('success', 'User is updated');
        res.location('/users');
        res.redirect('/users');
    });
});
router.get('/del/:id', function(req, res) {
    var id = req.params.id;
    User.removeById(id, function(err, status) {
        if (err) return err;
        req.flash('success', 'Delete successful');
        res.location('/users');
        res.redirect('/users');
    });
});
module.exports = router;