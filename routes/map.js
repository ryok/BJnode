var async = require('async');
var model = require('../model');
var Offers = model.offers;
var Users = model.users;

exports.get = function(req, res){
	console.log(req.query);

	async.waterfall([
		function(cb){
			var query = {
				_id: req.query.userId
			};

			Users.findOne(query, function(err, results){
				cb(err, results);
			});
		},function(data, cb){
			var query;
			console.log(data);

			// if(req.query.lng && req.query.lat){
			// 	query = {
			// 		lnglat: {
			// 			$nearSphere: [+req.query.lng, +req.query.lat],
			// 			$maxDistance: 1
			// 		}
			// 	};
			// }else if(req.query.ne && req.query.sw){
			if(req.query.ne && req.query.sw){
				var ne = [];
				var sw = [];

				ne = [+req.query.ne.split(',')[0], +req.query.ne.split(',')[1]];
				sw = [+req.query.sw.split(',')[0], +req.query.sw.split(',')[1]];
				
				// req.query.ne.forEach(function(val){
				// 	ne.push(+val);
				// });
				// req.query.sw.forEach(function(val){
				// 	sw.push(+val);
				// });

				query = {
					lnglat: {
						$geoWithin:{
							$box: [ne, sw]
						}
					}
				};
			}

			var or = [];
			if(data.type.cute > data.type.beautiful){
				or.push({
					'type.cute': true,
					'type.beautiful': false
				});
			}else{
				or.push({
					'type.cute': false,
					'type.beautiful': true
				});
			}
			if(data.type.lolita > data.type.milf){
				or.push({
					'type.lolita': true,
					'type.milf': false
				});
			}else{
				or.push({
					'type.lolita': true,
					'type.milf': false
				});
			}
			if(data.type.sexy > data.type.pure){
				or.push({
					'type.sexy': true,
					'type.pure': false
				});
			}else{
				or.push({
					'type.sexy': true,
					'type.pure': false
				});
			}
			query['$or'] = or;
			
			Offers.find(query, function(err, results){
				cb(err, results);
			});
		}
	],function(err, data){
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
