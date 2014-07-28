$(function(){
	var geo = navigator.geolocation;
	var latlng = [35.65858, 139.745433]; // 東京タワー
	
	if(geo){
		geo.getCurrentPosition(
			function(pos){
				latlng = [pos.coords.latitude, pos.coords.longitude];
				mapDraw();
			}, function(err){
				console.log(err);
				mapDraw();
			}
		);
	}else{
		mapDraw();
	}

	function mapDraw(){
		var mapOpt = {
			center: new google.maps.LatLng(latlng[0], latlng[1]),
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map($('#map')[0],mapOpt);
	}
});
