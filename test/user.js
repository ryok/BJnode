var should = require('should');
var request = require('request');

// var url = 'http://localhost:3000/user';
var url = 'http://rehack-node.cloudapp.net/user';

var userId = '52aef1976570b0f0c0000001';
var fav = '52aef156a2441804c10000ff';

describe('/userのテスト', function(){
	// it('ユーザの新規登録', function(done){
	// 	request.post({
	// 		url: url
	// 	}, function(err, res, body){
	// 		if(err){
	// 			throw err;
	// 		}else{
	// 			// console.log(JSON.stringify(res));
	// 			console.log(body);
	// 			done();
	// 		}
	// 	});
	// });

	it('ユーザの更新', function(done){
		request.put({
			url: url,
			form: {
				params:{
					// userId: '52ad511fe16d3b821e000001',
					userId: userId,
					cute: true,
					milf: true,
					sexy: true
					// fav: '52a4727c5db1d2054a00043b'
					// fav: '52a1dc2ad29502162e000ff4'
				}
			}
		}, function(err, res, body){
			if(err){
				throw err;
			}else{
				// console.log(JSON.stringify(res));
				console.log(body);
				done();
			}
		});
	});

	// it('お気に入りの追加', function(done){
	// 	request.put({
	// 		url: url,
	// 		form: {
	// 			params: {
	// 				userId: userId,
	// 				fav: fav
	// 			}
	// 		}
	// 	}, function(err, res, body){
	// 		if(err){
	// 			throw err;
	// 		}else{
	// 			// console.log(JSON.stringify(res));
	// 			console.log(body);
	// 			done();
	// 		}
	// 	});
	// });

	// it('お気に入りの削除', function(done){
	// 	request.del({
	// 		url: url,
	// 		form: {
	// 			params: {
	// 				userId: '52aeec83ca2f9cefbe000001',
	// 				fav: '52aeea949cfd84d2be000138'
	// 			}
	// 		}
	// 	}, function(err, res, body){
	// 		if(err){
	// 			throw err;
	// 		}else{
	// 			// console.log(JSON.stringify(res));
	// 			console.log(body);
	// 			done();
	// 		}
	// 	});
	// });

});
