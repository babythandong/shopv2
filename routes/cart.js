var express = require('express');
var router = express.Router();
var Post = require('../models/post');
router.post('/:id', function(req, res) {
    req.session.cart = req.session.cart || {};
    var cart = req.session.cart;
    Post.findOne({ _id: req.params.id }, function(err, post) {
        if (cart[req.params.id]) {
            cart[req.params.id].qty++;
        } else {
            cart[req.params.id] = {
                item: post._id,
                name: post.title,
                price: post.price,
                qty: req.body.qty,
                total: req.body.qty * post.price
            }
        }
        res.redirect('/cart');
    })

});
router.get('/', function(req, res) {
    var cart = req.session.cart;
    var total = 0;
    for (var item in cart) {
        total += cart[item].qty * cart[item].price;
    }
    res.render('private/cart/index', { 'title': 'Cart', carts: cart, total: total });
    //res.send(cart);
    console.log(cart);
});
module.exports = router;