var async = require('async');
var model = require('../model');
var Users = model.users;
var Offers = model.offers;

exports.get = function(req, res){
	console.log(req.query);

	async.waterfall([
		function(cb){
			// userIdからfavを取得
			var query = {
				_id: req.query.userId
			};
			var field = {
				fav: 1
			};
			
			Users.findOne(query, field, {}, function(err, results){
				cb(err, results);
			});
		}, function(data, cb){
			// favの配列からofferを取得
			var query ={
				_id: {
					$in: []
				}
			};
			if(data && data.fav){
				query._id = {
					$in: data.fav
				};
			}

			var option = {};
			if(req.query.skip){
				option.skip = +req.query.skip;
			}
			if(req.query.limit){
				option.limit = +req.query.limit;
			}

			Offers.find(query, {}, option, function(err, results){
				cb(err, results);
			});

		}
	], function(err, data){
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'Content-Type');
		if(err){
			console.log(err.stack);
			res.send(err, 500);
		}else{
			res.send(data, 200);
		}
	});
};
