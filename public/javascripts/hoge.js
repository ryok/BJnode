$(function(){
	// navigator.geolocation.getCurrentPosition(function(pos){
	// 	var latlng = [pos.coords.latitude, pos.coords.longitude];

	// 	var mapOpt = {
	// 		center: new google.maps.LatLng(latlng[0], latlng[1]),
	// 		zoom: 15,
	// 		mapTypeId: google.maps.MapTypeId.ROADMAP
	// 	};

	// 	var map = new google.maps.Map($('#map')[0],mapOpt);

	// 	// $.ajax({
	// 	// 	type: 'get',
	// 	// 	// url: 'http://localhost:3000/beauty/',
	// 	// 	url: 'http://rehack-node.cloudapp.net:3000/map',
	// 	// 	data:{
	// 	// 		userId: '52aaf1e6ce8cd75b87000001',
	// 	// 		lat: latlng[0],
	// 	// 		lng: latlng[1]
	// 	// 	},
	// 	// 	success: function(res){
	// 	// 		console.log(res);
	// 	// 	},
	// 	// 	error: function(res){
	// 	// 		console.log(res);
	// 	// 	}
	// 	// });
	// }, function(err){
	// 	alert('err.code: ' + err.code);
	// }, {
	// 	enableHighAccuracy: true,
	// 	timeout: 5000,
	// 	maximumAge: 600000
	// });

	// user取得
	// $.ajax({
	// 	type: 'get',
	// 	url: 'http://localhost:3000/user',
	// 	// url: 'http://rehack-node.cloudapp.net:3000/user',
	// 	data:{
	// 		userId: '52aaef6b3837ddac18000001'
	// 	},
	// 	success: function(res){
	// 		console.log(res);
	// 	},
	// 	error: function(res){
	// 		console.log(res);
	// 	}
	// });

	$.ajax({
		type: 'put',
		// url: 'http://localhost:3000/user',
		url: 'http://rehack-node.cloudapp.net:3000/user/',
		data:{
			params: {
				// userId: '52ad511fe16d3b821e00000',
				// cute: true,
				// beautiful: false,
				// lolita: false,
				// milf: true
				fav: '52a1dc2ad29502162e000ff4',
				userId: '52a4961cf9d6ee6a59000001'
			}
		},
		success: function(res){
			console.log(res);
		},
		error: function(res){
			console.log(res);
		}
	});
});
