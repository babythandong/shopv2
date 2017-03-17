/**
 * Module dependencies
 **/
var mongoose = require('mongoose');

/**
 * Initialize pagination module
 * @param {app} express app param
 **/
exports.init = function (app) {
   app.locals.paginate = paginateHelper;
};


/**
 * @function paginateHelper
 * @param {opts} query Mongoose options
 * @param {callback} callback
 * Global view helper
 **/
function paginateHelper(collection) {
	if (!collection.totalPages || collection.totalPages < 2) return '';
	var page = parseInt(collection.currentPage, 10);
	var pages = collection.totalPages;
	var html = '<div class="pagination">';
	var prevClass = 'prev' + (page === 1 ? ' disabled': '');
	var nextClass = 'next' + (page === pages ? ' disabled': '');
	var prevLink = ((page - 1) > 0 ? "?page="+(page - 1) : '#');
	var nextLink = ((page + 1) <= pages ? "?page="+(page + 1) : '#');
	html += '<ul><li class="' + prevClass + '">';
	html += "<a href='" + prevLink + "'>&larr; Previous</a>";
	html += '</li>';
	for (var i = 1; i <= pages; i++ ) {
		if (i == page) {
			html += '<li class="active"><a href="#">'+i+'</a></li>';
		} else {
			html += "<li><a href='?page="+i+"'>"+i+"</a></li>";
		}
	}
	html += '<li class="' + nextClass + '">';
	html += "<a href='" + nextLink + "'>Next &rarr;</a>";
	html += '</li></ul></div>';
	return html;
};

/**
 * @method paginate
 * @param {opts} query Mongoose options
 * @param {callback} callback
 * Extend Mongoose Models to paginate queries
 **/
mongoose.Model.paginate = function(opts, callback) {
   var limit = opts.limit || 10;
   var page = opts.page || 1;
   var Model = this;

	Model.count(function (err, totalRecords) {
		var query = Model.find({}).skip((page - 1) * limit).limit(limit);
		query.exec(function(error, records) {
			if (err) return callback(err);
				records.totalRecords = totalRecords;
				records.currentPage = page;
				records.totalPages = Math.ceil(totalRecords / limit);
				callback(null, records);
        });
    });
}
