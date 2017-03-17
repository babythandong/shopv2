var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var userSchema = new Schema({
    name: String,
    email: String,
    password: {
        type: String
    },
    point: {
        type: Number,
        default: 0
    },
    createAt: Date
});
var User = module.exports = mongoose.model('user', userSchema);
module.exports.createUser = function(newData, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newData.password, salt, function(err, hash) {
            newData.password = hash;
            newData.save(callback);
        });
    })
}
module.exports.getUserByEmail = function(email, callback) {
    var query = { email: email };
    User.findOne(query, callback);
}
module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) return err;
        callback(null, isMatch);
    });
}
module.exports.getAllUser = function(callback) {
    User.find({}, {}, callback);
}
module.exports.getUserById = function(id, callback) {
    var query = { _id: id };
    User.findById(id, callback);
}
module.exports.updateUserById = function(id, newData, callback) {
    var query = { _id: id };
    User.findOneAndUpdate(query, newData, callback);
}
module.exports.removeById = function(id, callback) {
    var query = { _id: id };
    User.findOneAndRemove(query, callback);
}