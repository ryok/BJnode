var async = require('async');
var model = require('../model');
var Users = model.users;
var Offers = model.offers;

exports.get = function(req, res){
	console.log(req.query);

	// ユーザ情報の取得
	var query = {};
	if(req.query.userId){
		// userIdが指定されている場合
		query._id = req.query.userId;

		Users.findOne(query, function(err, results){
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
			res.header('Access-Control-Allow-Headers', 'Content-Type');
			if(err){
				console.log(err.stack);
				res.send(err, 500);
			}else{
				res.send(results, 200);
			}
		});
	}else{
		// userIdが指定されていない場合 ※確認用
		Users.find(query, function(err, results){
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
			res.header('Access-Control-Allow-Headers', 'Content-Type');
			if(err){
				console.log(err.stack);
				res.send(err, 500);
			}else{
				res.send(results, 200);
			}
		});
	}
};

exports.post = function(req, res){
	console.log('user.post : ' + req.body);

	// ユーザの新規登録
	var param = {
		type: {
			cute: 0,
			beautiful: 0,
			lolita: 0,
			milf: 0,
			sexy: 0,
			pure: 0
		},
		fav: [],
		create: new Date()
	};
	
	var users = new Users(param);
	users.save(function(err, results){
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'Content-Type');
		if(err){
			console.log(err.stack);
			res.send(err, 500);
		}else{
			res.send(results, 200);
		}
	});
};

exports.put = function(req, res){
	console.log(req.body);

	// ユーザの更新
	var body = req.body.params;
	var data = {};
	var inc = {};

	async.waterfall([
		function(cb){
			if(body.fav){
				// お気に入りの追加の場合
				data['$push'] = {
					fav: body.fav
				};
				
				var query = {
					_id: body.fav
				};
				var field = {
					type: 1
				};
				Offers.findOne(query, field, {}, function(err, results){
					if(err){
						cb(err);
					}else{
						var type = results.type;

						if(type.cute){
							inc['type.cute'] = 1;
						}
						if(type.beautiful){
							inc['type.beautiful'] = 1;
						}
						if(type.lolita){
							inc['type.lolita'] = 1;
						}
						if(type.milf){
							inc['type.milf'] = 1;
						}
						if(type.sexy){
							inc['type.sexy'] = 1;
						}
						if(type.pure){
							inc['type.pure'] = 1;
						}
						cb();
					}
				});
			}else{
				cb();
			}
		}, function(cb){
			// プロファイルの更新
			if(body.cute || body.beautiful || body.lolita || body.milf || body.sexy || body.pure){
				if(body.cute == 'true'){
					inc['type.cute'] = 1;
				}
				if(body.beautiful == 'true'){
					inc['type.beautiful'] = 1;
				}
				if(body.lolita == 'true'){
					inc['type.lolita'] = 1;
				}
				if(body.milf == 'true'){
					inc['type.milf'] = 1;
				}
				if(body.sexy == 'true'){
					inc['type.sexy'] = 1;
				}
				if(body.pure == 'true'){
					inc['type.pure'] = 1;
				}
			}
			data['$inc'] = inc;


			var query = {
				_id: body.userId
			};

			Users.update(query, data, {}, function(err, results){
				cb(err, results);
			});
		}
	], function(err, results){
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'Content-Type');
		if(err){
			console.log(err.stack);
			res.send(err, 500);
		}else{
			res.send(results, 200);
		}
	});
};

exports.delete = function(req, res){
	console.log(req.body);

	// お気に入りの解除
	var body = req.body.params;
	var data = {};
	async.waterfall([
		function(cb){
			// offerのtypeをuserのtypeから-1
			var query = {
				_id: body.fav
			};
			var field = {
				type: 1
			};
			
			Offers.findOne(query, field, {}, function(err, results){
				if(err){
					cb(err);
				}else{
					var type = results.type;
					var inc = {};
					
					if(type.cute){
						inc['type.cute'] = -1;
					}
					if(type.beautiful){
						inc['type.beautiful'] = -1;
					}
					if(type.lolita){
						inc['type.lolita'] = -1;
					}
					if(type.milf){
						inc['type.milf'] = -1;
					}
					if(type.sexy){
						inc['type.sexy'] = -1;
					}
					if(type.pure){
						inc['type.pure'] = -1;
					}
					data['$inc'] = inc;
					cb();
				}
			});
		}, function(cb){
			var query = {
				_id: body.userId
			};
			data['$pull'] = {
				fav: body.fav
			};

			Users.update(query, data, {}, function(err, results){
				cb(err, results);
			});
		}
	], function(err, results){
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.header('Access-Control-Allow-Headers', 'Content-Type');
		if(err){
			console.log(err.stack);
			res.send(err, 500);
		}else{
			res.send(results, 200);
		}
	});
};
