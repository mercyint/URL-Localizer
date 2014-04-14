// JavaScript Document
$j = jQuery.noConflict();

document.stationObjects = new Array();;

function Location(city,callsign,MHz,lat,lng){
	this.city = city;
	this.callsign = callsign;
	this.MHz = MHz;
	this.lat = lat;
	this.lng = lng;
}


function Station(name,description,title,url,logo) {
	this.name = name;
	this.description = description;
	this.title = title;
	this.url = url;
	this.logo = logo;
	this.locations = new Array();
	this.nearest = "";
	this.feed = "";
	document.stationObjects.push(this.name);
	
	this.addLocation = function (city,callsign,MHz,lat,lng) {
		this_loc = new Location(city,callsign,MHz,lat,lng);
		this.locations.push(this_loc);
		if(this.nearest == ""){
			this.nearest = this_loc;
		}
	}

	this.setNearest = function (lat,lng){
			
			var dist_array = new Array();
			if(this.locations.length < 2){
				this.nearest = this.locations[0];
			}else{
				for(i=0;i< this.locations.length;i++){
				  this[this.locations[i].callsign +'_dist'] = getDistance(this.locations[i].lat,this.locations[i].lng,lat,lng);
				console.log(getDistance(this.locations[i].lat,this.locations[i].lng,lat,lng));
				  dist_array.push(this[this.locations[i].callsign +'_dist'])
				}
				dist_array.sort(function(a,b){return a-b});
		  
				  for(i=0;i < this.locations.length; i++){
					  if(dist_array[0] == this[this.locations[i].callsign +"_dist"]){
						this.nearest = this.locations[i];  
					  }
				  }
			}
	}

	this.addFeed = function(name,url,type){//REQUIRES included Feeds.js
		this.feed = new Feed(name,url,type,this);
		this.feed.source_name = this.name;
		this.feed.source_url = this.url;
	}
}

function StationGroup(){
	this.stations = new Array();
	
	this.addStation = function(station){
		this.stations.push(station);
	}
	
	this.getFeeds = function(){//REQUIRES include of Feeds.js
		returnGroup = new FeedGroup();
		for(var i=0;i < this.stations.length; i++){
			if(this.stations[i].feed != ""){
				twin_feed = this.stations[i].feed.copy();
				twin_feed.parent = returnGroup;
				twin_feed.title = this.stations[i].name+"–"+this.stations[i].nearest.city;
				returnGroup.feeds.push(twin_feed);
			}
		}
		return returnGroup;
	}

	this.geoSort = function (lat,lng){
			
			var dist_array = new Array();
			this.locations = new Array();
			var new_stations = new Array();
			
			for(var i = 0;i < this.stations.length; i++){
				this.stations[i].setNearest(lat,lng);
				this.stations[i].distance = getDistance(this.stations[i].nearest.lat,this.stations[i].nearest.lng,lat,lng);
				dist_array.push(this.stations[i].distance);
			}
			dist_array.sort(function(a,b){return a-b});
			
			for(var i = 0;i < dist_array.length; i++){
				for(var j = 0;j < this.stations.length; j++){
					if(this.stations[j].distance == dist_array[i]){
						new_stations[i] = this.stations[j];
					}
				}
			}
			
			this.stations = new_stations;
			
			}
}




//}

function getDistance(lat1,lon1,lat2,lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c;
}

function getStations(){
	 stationObjects = [];
	for(var key in window) {
	  var value = window[key];
	  if (value instanceof Station) {
		// foo instance found in the global scope, named by key
		stationObjects.push(value)
	  }
	}	
}

function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
}

/*function renderAllFeeds(group,count,display){//Deprecated use getFeeds() with FeedGroup.renderFeeds()
	for(var i = 0;i<group.stations.length;i++){
		//console.log("Render feed for: "+group.stations[i].name);
		$j('#stations').append('<div id="'+group.stations[i].name+'"></div>');
		group.stations[i].feed.publish(group.stations[i].name,count,display);
	}
}*/