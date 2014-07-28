var request = require('request');
var parse = require('xml2json');
var iconv = require('iconv').Iconv;
var conv = new iconv('SJIS', 'UTF-8');
var qs = require('querystring');
var async = require('async');

var model = require('../model');
var Offers = model.offers;

var data = [];
var img = [];

for(var cnt=0; cnt<=10; cnt++){
	async.waterfall([
		function(cb){
			// 美女APIから取得
			var url = 'http://bjin.me/api/?';
			var param = {
				format: 'json',
				count: '20',
				type: 'rand'
			};
			url = url + qs.stringify(param);

			console.log(url);

			request.get({
				url: url
			}, function(err, res, body){
				var result = JSON.parse(body);
				result.forEach(function(val){
					img.push(val.thumb);
				});

				cb();
			});
		},
		function(cb){
			// フロムエーAPIから取得
			var url = 'http://xml.froma.com/s/r/jobSearch.jsp?';
			var param = {
				api_key: '981cm69un81z8x8zh7l6cuf510si1te5',
				ksjcd: '07',
				xml_block: cnt,
				edhition_cd: '1',
				m_area_cd: 'ir',
				s_area_cd: '1ir001'
			};
			url = url + qs.stringify(param);

			console.log(url);

			request.get({
				url: url,
				encoding: null
			}, function(err, res, body){
				var result = JSON.parse(parse.toJson(conv.convert(body)));
				var offer = result.OfferList.Offer;
				
				offer.forEach(function(oVal, i){
					if(oVal.GeoPointList.GeoPoint instanceof Array){
						param = {
							rqmt_id: oVal.OfferId,
							edhition_cd: '01'
						};
						url = 'http://froma.com/s/p/baito/F13010Bs.jsp?';
						url = url + qs.stringify(param);

						// var lng = oVal.GeoPointList.GeoPoint[0].GeoPointLongitude.slice(1).split('.');
						// var lat = oVal.GeoPointList.GeoPoint[0].GeoPointLatitude.slice(1).split('.');

						// lng = +lng[0]+(+lng[1]/60)+(+lng[2]/3600);
						// lat = +lat[0]+(+lat[1]/60)+(+lat[2]/3600);

						// lng = lng -0.000046038 * lat - 0.000083043 * lng + 0.010040;
						// lat = lat - 0.0001069 * lat + 0.000017464 * lng + 0.0046017;
						// data.push({
						// 	name: oVal.CorporateName,
						// 	catch: oVal.Catch,
						// 	detail: oVal.JobTypeDetail,
						// 	pay: oVal.PayText,
						// 	img: img[i],
						// 	lnglat: [lng, lat],
						// 	url: url
						// });
						
						oVal.GeoPointList.GeoPoint.forEach(function(gVal){
							var lng = gVal.GeoPointLongitude.slice(1).split('.');
							var lat = gVal.GeoPointLatitude.slice(1).split('.');

							lng = +lng[0]+(+lng[1]/60)+(+lng[2]/3600);
							lat = +lat[0]+(+lat[1]/60)+(+lat[2]/3600);

							lng = lng -0.000046038 * lat - 0.000083043 * lng + 0.010040;
							lat = lat - 0.0001069 * lat + 0.000017464 * lng + 0.0046017;
							
							data.push({
								name: oVal.CorporateName,
								catch: oVal.Catch,
								detail: oVal.JobTypeDetail,
								pay: oVal.PayText,
								img: img[i],
								lnglat: [lng, lat],
								url: url
							});
						});
					}else if(oVal.GeoPointList.GeoPoint){
						
						var lng = oVal.GeoPointList.GeoPoint.GeoPointLongitude.slice(1).split('.');
						var lat = oVal.GeoPointList.GeoPoint.GeoPointLatitude.slice(1).split('.'); 

						lng = +lng[0]+(+lng[1]/60)+(+lng[2]/3600);
						lat = +lat[0]+(+lat[1]/60)+(+lat[2]/3600);

						lng = lng - 0.000046038 * lat - 0.000083043 * lng + 0.010040;
						lat = lat - 0.0001069 * lat + 0.000017464 * lng + 0.0046017;

						param = {
							rqmt_id: oVal.OfferId,
							edhition_cd: '01'
						};
						url = 'http://froma.com/s/p/baito/F13010Bs.jsp?';
						url = url + qs.stringify(param);
						
						data.push({
							name: oVal.CorporateName,
							catch: oVal.Catch,
							detail: oVal.JobTypeDetail,
							pay: oVal.PayText,
							img: img[i],
							lnglat: [lng, lat],
							url: url
						});
					}
				});

				data.forEach(function(val){
					val.type = {};
					val.type.cute = (Math.floor((Math.random()*2))>0) ? true : false;
					if(val.type.cute){
						val.type.beautiful = false;
					}else{
						val.type.beautiful = true;
					}
					val.type.lolita = (Math.floor((Math.random()*2))>0) ? true : false;
					if(val.type.lolita){
						val.type.milf = false;
					}else{
						val.type.milf = true;
					}
					val.type.sexy = (Math.floor((Math.random()*2))>0) ? true : false;
					if(val.type.sexy){
						val.type.pure = false;
					}else{
						val.type.pure = true;
					}

					val.create = new Date();
				});
				
				cb();
			});
		}		
	], function(err, res){
		data.forEach(function(val){
			var offers = new Offers(val);
			offers.save(function(err, res){
				if(err){
					console.log(err.stack);
				}else{
					console.log(res);
				}
			});
		});
	});
}
