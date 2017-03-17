var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var Category = require('../models/category');

router.get('/', function(req, res) {
    Post.getAllPost(function(err, posts) {
        if (err) return err;
        res.render('private/post/index', { title: 'List Post', posts: posts });
    });

});
router.get('/add', function(req, res) {
    Category.getAllCategory(function(err, categories) {
        if (err) return err;
        res.render('private/post/add', { title: 'Add Post', categories: categories });
    });
});
router.post('/add', function(req, res) {
    var title = req.body.title;
    var intro = req.body.intro;
    var parent = req.body.parent;
    var price = req.body.price;
    var img = req.files;
    var thumbnail = img[0].filename;
    var content = req.body.content;
    var post = new Post({
        title: title,
        intro: intro,
        parent: parent,
        price: price,
        thumbnail: thumbnail,
        content: content,
        create: new Date()
    });
    Post.createPost(post, function(err, post) {
        if (err) return err;
        Category.getCategoryByName(parent, function(err, cate) {
            if (err) return err;
            var count_post = cate.count;
            var count = count_post + 1;
            Category.editCategoryByName(parent, { count: count }, function(err, status) {
                if (err) return err;
                req.flash('success', 'Post is created');
                res.location('/posts');
                res.redirect('/posts');
            })
        });
    });
});
module.exports = router;