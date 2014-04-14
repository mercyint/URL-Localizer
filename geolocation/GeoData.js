$j = jQuery.noConflict();


function GeoData(){
	this.zip = "";
	this.data = "";
	this.coords = "";
	this.onchange = "";//function to call on change
	
	$j('body').append("<div id='GeoDataDiv'></div>");	
	$j('#GeoDataDiv').append('<input type="hidden" id="GeoDataLat" onchange="'+this.onchange+'"><input type="hidden" id="GeoDataLng">')
	
	this.getDataByZip = function (){
		this.updateChangeFunction();
		geo_data = this;
		$j.ajax({
			type: "GET",
			async: "true",
			url: "http://maps.googleapis.com/maps/api/geocode/json?address="+geo_data.zip+"&sensor=false&country=us",
			dataType: "json",
					}).done(function (data){
						console.log(data);
						if(data.results.length > 0){
						geo_data.coords = data.results[0].geometry.location;
						
						$j("#GeoDataLat").val(geo_data.coords.lat).change();
						$j("#GeoDataLng").val(geo_data.coords.lng);
						}else{
							alert("The zip code provided could not be found.");
						}
					});
	
/*		return $j.getJSON("http://maps.googleapis.com/maps/api/geocode/json?address="+geo_data.zip+"&sensor=false&country=us",function(results){
					}).done(function (data){
						geo_data.coords = data.results[0].geometry.location;
					});*/
	
		}

	this.updateChangeFunction = function(){
		$j("#GeoDataLat").attr("onchange",this.onchange);
		$j("#GeoDataLng").attr("onchange",this.onchange);
	}

	this.setZip = function (zip){
	
		zipCookie = getCookie('GeoDataZip');
		console.log(zipCookie);
		if(!zip && zipCookie){// no zip provided, cookie present
			this.zip = zipCookie;
			this.getDataByZip(zipCookie);
		}else if(zip){//zip provided, cookie overwrite
			this.zip = zip;
			this.getDataByZip(zip);
			setCookie('GeoDataZip',zip);
		}else{//default don't set cookie
			this.zip = '80204';
			this.getDataByZip('80204');
		}
	}




}





function setCoords(data){
	
}

function setCookie(name,value){
	$j.cookie(name , value,{expires: 180,  path: "/"});
}

function getCookie(cookie){
	if($j.cookie(cookie) === "undefined" || $j.cookie(cookie) === null){//no cookie
		return false;
	}else{
		return $j.cookie(cookie);
	}
	
}

