var model = require('../model');
var Offers = model.offers;

exports.get = function(req, res){
	console.log(req.query);

	if(req.query.offerId){
		var query = {
			_id: req.query.offerId
		};
		
		Offers.findOne(query, function(err, results){
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
		Offers.find({}, function(err, results){
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
