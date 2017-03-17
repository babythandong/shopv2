var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: String,
    description: String,
    create: Date,
    parent: String,
    count: {
        type: Number,
        default: 0
    }
});
var Category = module.exports = mongoose.model('category', categorySchema);
module.exports.createCategory = function(newData, callback) {
    newData.save(callback);
}
module.exports.getCategoryById = function(id, callback) {
    var query = { _id: id };
    Category.findOne(query, callback);
}
module.exports.getCategoryParent = function(callback) {
    Category.find({ parent: '0' }, {}, callback);
}
module.exports.getAllCategory = function(callback) {
    Category.find({}, {}, callback);
}
module.exports.editCategoryById = function(id, newData, callback) {
    var query = { _id: id };
    Category.findOneAndUpdate(query, newData, callback);
}
module.exports.removeById = function(id, callback) {
    Category.findOneAndRemove({ _id: id }, callback);
}
module.exports.getCategoryByName = function(name, callback) {
    Category.findOne({ name: name }, callback);
}
module.exports.editCategoryByName = function(name, newData, callback) {
        Category.findOneAndUpdate({ name: name }, newData, callback);
    }
    // Phan trang 
module.exports.createPagination = function(pages, page) {
    var url = require('url'),
        qs = require('querystring'),
        params = qs.parse(url.parse(req.url).query),
        str = ''

    params.page = 0
    var clas = page == 0 ? "active" : "no"
    str += '<li class="' + clas + '"><a href="?' + qs.stringify(params) + '">First</a></li>'
    for (var p = 1; p < pages; p++) {
        params.page = p
        clas = page == p ? "active" : "no"
        str += '<li class="' + clas + '"><a href="?' + qs.stringify(params) + '">' + p + '</a></li>'
    }
    params.page = --p
    clas = page == params.page ? "active" : "no"
    str += '<li class="' + clas + '"><a href="?' + qs.stringify(params) + '">Last</a></li>'

    return str
}