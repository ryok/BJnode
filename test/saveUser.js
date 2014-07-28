var async = require('async');
var model = require('../model');
var Users = model.users;
var Offers = model.offers;

async.waterfall([
	function(cb){
		var query = {
			lnglat: {
				$nearSphere: [139.77941, 35.617562],
				$maxDistance: 1
			}
		};
		var field = {
			_id: 1
		};
		var option = {
			limit: 100
		};
		
		Offers.find(query, field, option, function(err, results){
			cb(err, results);
		});
	}, function(data, cb){
		var param = {
			create: new Date(),
			type: {
				cute: 30,
				beatiful: 13,
				lolita: 14,
				milf: 4,
				sexy: 18,
				pure: 15
			},
			fav: []
		};

		data.forEach(function(val){
			param.fav.push(val._id);
		});
		
		var users = new Users(param);
		users.save(function(err, res){
			cb(err, res);
		});
	}
], function(err, res){
	if(err){
		console.log(err.stack);
	}else{
		console.log(res);
	}
});
