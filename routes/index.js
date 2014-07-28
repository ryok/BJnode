var model = require('../model');
var Offers = model.offers;
var Users = model.users;

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.test = function(req, res){
	res.render('test', {title: 'Express', pretty: true});
};

exports.profile = function(req, res){
	res.render('profile', {title: 'Express', pretty: true});
};

exports.exMap = function(req, res){
	res.render('exMap', {title: 'Express', pretty: true});
};

exports.exFav = function(req, res){
	res.render('exFav', {title: 'Express', pretty: true});
};

exports.exPr = function(req, res){
	res.render('exPr', {title: 'Express', pretty: true});
};
