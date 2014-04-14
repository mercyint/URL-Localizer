// JavaScript Document

document.stationObjects = new Array();;

function Location(city,callsign,MHz,lat,lng){
	this.city = city;
	this.callsign = callsign;
	this.MHz = MHz;
	this.lat = lat;
	this.lng = lng;
}


function Feed(name,href,type,parent){
	this.name = name;
	this.href = href;
	this.type = type;
	this.parent = parent;
	
	this.publish = function(pub_div,count,display){
			//console.log("Publishing "+this.name);
	        url = this.href;
	        parent = this.parent;
	        count = count;
	        if(!display){
		        display = "";
	        }
			$.ajax({
				type: "GET",
				url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(url),
				dataType: 'json',
				error: function(){
						alert('Unable to load feed, Incorrect path or invalid feed');
					},
				success: function(data){
				articles = data.responseData.feed.entries;
				if (count == -1 || count == ""){
					article_count = articles.length;
				}else{
					article_count = count;
				}
				
				if(display == "excerpt"){
					for(var i = 0;i < article_count; i++){
						console.log(articles[i]);
						if(i == (article_count - 1)){
							last = " last";
						}else{
							last = "";
						}
						$("#"+pub_div).append('<div id="'+pub_div+'_'+i+'" class="clearfix'+last+'"></div>');
						if(articles[i].mediaGroups && articles[i].mediaGroups.length > 0){
							this_thmb = articles[i].mediaGroups[0].contents[0].thumbnails[0].url;
							$("#"+pub_div+'_'+i).append('<div class="rss_thmb"><img src="'+this_thmb+'" width="120px"/></div>');
						}
						
						$("#"+pub_div+'_'+i).append('<h2><a href="'+articles[i].link+'" target="_blank">'+articles[i].title+'</a></h2><p class="source"><a href="'+parent.url+'" target="_blank">'+parent.name+'-'+parent.nearest.city+' '+parent.nearest.MHz+'</a></p><p>'+articles[i].contentSnippet+'</p>');
						}
				}else{
					for(var i = 0;i < article_count; i++){
						$("#"+pub_div).append('<span><a href="'+parent.url+'" target="_blank">'+parent.name+'-'+parent.nearest.city+' '+parent.nearest.MHz+'</a></span><h2><a href="'+articles[i].link+'" target="_blank">'+articles[i].title+'</a></h2>');
				}
				}
			}
			});		
	}
}

function Station(name,description,title,url,logo) {
	this.name = name;
	this.description = description;
	this.title = title;
	this.url = url;
	this.logo = logo;
	this.locations = new Array();
	this.nearest = "";
	this.feed;
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
	this.addFeed = function(name,href,type){
		this.feed = new Feed(name,href,type,this);
	}
}

function StationGroup(){
	this.stations = new Array();
	
	this.addStation = function(station){
		this.stations.push(station);
	}
}

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

function renderAllFeeds(group,count,display){
	for(var i = 0;i<group.stations.length;i++){
		//console.log("Render feed for: "+group.stations[i].name);
		$('#stations').append('<div id="'+group.stations[i].name+'"></div>');
		group.stations[i].feed.publish(group.stations[i].name,count,display);
	}
}