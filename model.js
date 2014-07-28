var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/rehack');

var offers = mongoose.Schema({
	name: String,
	catch: String,
	detail: String,
	pay: String,
	img: String,
	lnglat: [
		Number, Number
	],
	type: {
		cute: Boolean,
		beautiful: Boolean,
		lolita: Boolean,
		milf: Boolean,
		sexy: Boolean,
		pure: Boolean
	},
	url: String,
	create: Date
});

var users = mongoose.Schema({
	type: {
		cute: Number,
		beautiful: Number,
		lolita: Number,
		milf: Number,
		sexy: Number,
		pure: Number
	},
	fav: [String],
	create: Date
});

exports.offers = db.model('offers', offers);
exports.users = db.model('users', users);
