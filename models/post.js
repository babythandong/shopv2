var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var postSchema = new Schema({
    title: String,
    intro: String,
    content: String,
    parent: String,
    price: {
        type: Number,
        default: 0
    },
    thumbnail: String,
    create: Date
});
var Post = module.exports = mongoose.model('post', postSchema);
module.exports.createPost = function(newPost, callback) {
    newPost.save(callback);
}
module.exports.getpostById = function(id, callback) {
    var query = { _id: id };
    Post.findOne(query, callback);
}
module.exports.getAllPost = function(callback) {
    Post.find({}, {}, callback);
}