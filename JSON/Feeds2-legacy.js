/* Feeds.js */
/* Copyright 2014 Mercy Interactive, Inc. and other contributors Licensed MIT */

$j = jQuery.noConflict();


function FeedGroup(){
	this.feeds = new Array();
	this.title = "";
	this.display = "title";
	this.article_count = 5;
	this.pub_div = "feed-group";
	this.output = "div";
	this.type = 'group';
	this.footer = "";
	this.parent = "";
	this.geoDataEnabled = false;
	this.geoDataOnSubmit = "updateZip()";
	this.geoDataDefaultText = "Enter Zip Code";
	this.streaming_icon = "";
	this.box_class = "";
	this.item_class = "";
	
	this.addFeed = function(title,url,type){
		if(title.type && (title.type == 'RSS' || title.type == 'JSON')){
			this.feeds.push(title);
			this.feeds[this.feeds.length -1].parent = this;						
		}else if(type == "group"){
			this.feeds.push(url);
			this.feeds[this.feeds.length -1].parent = this;						
		}else{
			this_feed = new Feed(title,url,type,this);
			this_feed.streaming_icon = this.streaming_icon;
			this_feed.box_class = this.box_class;
			this_feed.item_class = this.item_class;
			this.feeds.push(this_feed);			
		}
	}
	
	this.renderFeeds = function (){
		var pub_div = this.pub_div;
		var count = this.article_count;
		var footer = this.footer;
		
		//clear the publication div
		$j("#"+pub_div).empty();
		console.log(this);
		
		if (count == -1 || count == ""){
			article_count = articles.length;
		}else{
			article_count = this.article_count;
		}
		
		
		if(this.output == "tabs"){//append ul for tabs if enabled
			this_ul = $j('<ul>',{'id':pub_div+'_ul'});
			$j("#"+pub_div).append(this_ul);
		}

	  	if(this.geoDataEnabled){
	  		console.log("geoDataEnabled");
	  		zipCookie = getCookie('GeoDataZip');
	  		if(zipCookie){
		  		val=zipCookie;
	  		}else{
		  		val= this.geoDataDefaultText;
	  		}
			  		gd_form = $j('<form/>').attr('onsubmit',this.feeds[i].geoDataOnSubmit);
			  		gd_form.append($j('<input/>').attr({
				  		'type':'text',
				  		'name':'zip',
				  		'value':val
			  		})); 
			  		gd_form.append($j('<input/>').attr({
				  		'type':'submit',
				  		'id':'go',
				  		'value':'Go'
			  		})); 
					$j("#"+this.feeds[i].pub_div+"").append(gd_form);			  	
	  	}
	

		for(var i=0;i < this.feeds.length;i++){
			if(this.output == "tabs"){
				this_tab = $j('<li/>');
				this_tab_link = $j('<a/>',{'href': '#'+pub_div+'_'+slugify(this.feeds[i].title)});
				this_tab_link.text(this.feeds[i].title);
				this_tab.append(this_tab_link);
				$j("#"+pub_div+"_ul").append(this_tab);
			}
			if(this.output != "aggregate"){
  				this_div = $j('<div/>').attr('id',pub_div+'_'+slugify(this.feeds[i].title));
  				$j("#"+pub_div+"").append(this_div);	
			}else{
				this.feeds[i].show_title = false;		  	
			}

		  	if(this.feeds[i].type == 'group'){
		  		//console.log(this.feeds[i].title);
			  	this.feeds[i].pub_div = pub_div+'_'+slugify(this.feeds[i].title);
			  	this.feeds[i].article_count = 1;
			  	
			  	if(!this.geoDataEnabled && this.feeds[i].geoDataEnabled){
				  	zipCookie = getCookie('GeoDataZip');
			  		if(zipCookie){
				  		val=zipCookie;
			  		}else{
				  		val= this.feeds[i].geoDataDefaultText;
			  		}
			  		gd_form = $j('<form/>').attr('onsubmit',this.feeds[i].geoDataOnSubmit);
			  		gd_form.append($j('<input/>').attr({
				  		'type':'text',
				  		'name':'zip',
				  		'value':val
			  		})); 
			  		gd_form.append($j('<input/>').attr({
				  		'type':'submit',
				  		'id':'go',
				  		'value':'Go'
			  		})); 
					$j("#"+this.feeds[i].pub_div+"").append(gd_form);			  	
			  	}

			  	
			  	
			  	
			  	for(var j=0;j<this.feeds[i].feeds.length;j++){
			  		this_div = $j('<div/>').attr({
				  		'id':pub_div+'_'+slugify(this.feeds[i].title)+'_'+slugify(this.feeds[i].feeds[j].title),
				  		'style':'white-space:normal',
				  		'class':this.feeds[i].feeds[j].box_class
			  		});
			  		$j("#"+pub_div+'_'+slugify(this.feeds[i].title)).append(this_div);

				  	this.feeds[i].feeds[j].show_title = false;
				  	if(this.feeds[i].geoDataEnabled){
				  		if(j==0){
				  		console.log(3);
					  		this.feeds[i].feeds[j].article_count = 3;
				  		}else if (j==1){
				  		console.log(2);
					  		this.feeds[i].feeds[j].article_count = 2;
				  		}else{
				  		console.log(1);
					  		this.feeds[i].feeds[j].article_count = 1;
				  		}
					  	
				  	}else{
				  		this.feeds[i].feeds[j].article_count = 1;
				  	}
				  	
				  	this.feeds[i].feeds[j].renderFeed();		  				  	
			  	}
				  	if(this.feeds[i].footer){
				  		this_div = $j('<div/>').attr({
					  		'id':pub_div+'_foot',
					  		'class':'feed_footer'
				  		});
				  		this_div.text(this.feeds[i].footer);
				  		$j("#"+pub_div+'_'+slugify(this.feeds[i].title)).append(this_div);
				  	}
			  	
		  	}else{
			  	this.feeds[i].article_count = this.article_count;		  	
			  	this.feeds[i].renderFeed();		  	
		  	}
		  	
		}
	  	if(this.footer && this.parent.length == 0){
	  	this_div = $j('<div/>').attr({
		  	'id':pub_div+'_foot',
		  	'class':'feed_footer'
	  	});
	  	this_div.text(this.footer);
	  	$j("#"+pub_div+"").append(this_div);
	  	}
	  
	  
		if(this.output == "tabs"){
	  		$j("#"+pub_div+"").tabs();
		}
	  	if(this.output == "aggregate"){
		  	$j("#"+pub_div+" > div").sort(sort_date).appendTo("#"+pub_div);
		  	function sort_date(a, b){
		  	return ($j(b).data('pubDate')) < ($j(a).data('pubDate')) ? 1 : -1;    
			}
	  	}
	}
		
}


function Feed(title,url,type,parent){
	this.title = title;
	this.title_url = "";
	this.url = url;
	this.type = type;
	this.parent = parent;
	this.streaming_url = "";/* for stations with a live stream */
	this.data = '';
	this.pub_div = '';
	this.article_count = 5;
	this.display = 'title';
	this.output = "text/image";
	this.title_class = "";
	this.title_style = "";
	this.show_title = true;
	this.source_url = "";
	this.source_name = "";
	this.streaming_icon = "";
	this.box_class = "";
	this.item_class = "";
	this.read_more_text = "Read More";
	this.read_more_class = "read-more";
	this.default_image = "";
	this.media_override = new Array(); //Array of overrides one override is added as new Array(media(image|video),find_string,replace_string)
	
	this.loadFeed = function(){
		console.log("Loading feed: "+ this.title);
		if(this.type == "JSON"){
		 return $j.ajax({
			type: "GET",
			url: this.url+'?json=1',
			dataType: "jsonp",
			cache: false
		  });
	  }else{
		 return $j.ajax({
			type: "GET",
			url: '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+this.article_count+'&callback=?&q=' + encodeURIComponent(this.url),
			dataType: "jsonp",
			cache: false
		  });
		  
	  }		
	}
	
	this.copy = function(){
		twin_feed = new Feed(this.title,this.url,this.type,this.parent);
		twin_feed.source_url = this.source_url;
		twin_feed.source_name = this.source_name;
		twin_feed.streaming_url = this.streaming_url;
		twin_feed.streaming_icon = this.streaming_icon;
		twin_feed.box_class = this.box_class;
		twin_feed.item_class = this.item_class;
		twin_feed.read_more_text = this.read_more_text;
		twin_feed.default_image = this.default_image;
		
		return twin_feed;
	}
	
	this.renderFeed = function(data){
		var feed = this;
		this.loadFeed().done(function (result){
			feed.data = result;
			console.log(feed);
			if(feed.parent){
				var pub_div = feed.parent.pub_div;				
//				var count = feed.parent.article_count;
				var count = feed.article_count;
				var display = feed.parent.display;
			}else{
				var pub_div = feed.pub_div;				
				var count = feed.article_count;
				var display = feed.display;
			}
	
			if(feed.parent && feed.parent.output == "aggregate"){
				var output_div = pub_div;
			}else{
				var output_div = pub_div+"_"+slugify(feed.title);
				if($j('#'+output_div).length <= 0){
					this_div = $j('<div/>').attr({
						'id':output_div,
						'class':feed.box_class
					});
					if(feed.display != 'feature'){
						$j('#'+pub_div).append(this_div);
					}
				}
			}
			
			if(feed.type == 'JSON'){
				  if(feed.data.post){
				  	//console.log('Single Post');
					  this_feed = new Array();
					  this_feed.push(data.post);
				  }else if (feed.data.posts){
					  this_feed = feed.data.posts;
				  }
				  				  
				  if(count == -1){count = this_feed.length;}
				  if(feed.show_title == true){
				  	if(feed.title_url.length > 0){
					  	this_title = '<a href="'+feed.title_url+'" target="_blank">'+feed.title+'</a>';
				  	}else{
					  	this_title = feed.title;
				  	}
				  	$j("#"+output_div).parent().prepend('<h2 class="'+feed.title_class+'" style="'+feed.title_style+'">'+this_title+'</h2>');
				  }
				  
				  for(var i = 0;i < count; i++){
					  if(display == "excerpt"){
				  		
				  		if(i == (count - 1)){
							last = "_last";
						}else{
							last = "";
						}

				  		this_div = $j('<div/>').attr({
				  			'id':output_div+'_'+i,
				  			'class':'clearfix rss_excerpt'+last+' '+feed.item_class,
				  		});
				  		$j("#"+output_div).append(this_div);

				  		
				  		if(this_feed[i].custom_fields.bento_image && this_feed[i].custom_fields.bento_image.length){
				  			this_div = $j('<div/>').attr({
				  				'class':'json_thmb',
				  			});
				  			this_div.append($j('img').attr('src',this_feed[i].custom_fields.bento_image));
				  			$j('#'+output_div+'_'+i).append(this_div);
				  		}else if(this_feed[i].attachments && this_feed[i].attachments.length > 0){
							  img_src = this_feed[i].attachments[0].url.split('.');
							  img_src_path = "";
							  for(var j=0;j < img_src.length;j++){
							  	if(j == img_src.length - 1){
								  img_src_path = img_src_path + img_src[j];
							  	}else if(j == img_src.length - 2){
								  img_src_path = img_src_path + img_src[j] + "-88x88.";			  	
							  	} else {
								  img_src_path = img_src_path + img_src[j] + ".";			  	
							  	}
							  }
				  			this_div = $j('<div/>').attr({
				  				'class':'json_thmb',
				  			});
				  			this_div.append($j('<img/>').attr('src',img_src_path));
				  			$j('#'+output_div+'_'+i).append(this_div);
						}else{
								//attempt to find image in content
								var temp = $j('<div/>');
								temp.innerHTML = this_feed[i].content;
								var img = $j(temp).find('img').first().attr('src');
								if(img && img.indexOf('facebook.png') == -1){
						  			this_div = $j('<div/>').attr({
						  				'class':'json_thmb',
						  			});
						  			this_div.append($j('<img/>').attr('src',img));
						  			$j('#'+output_div+'_'+i).append(this_div);
								}else if(feed.default_image){
						  			this_div = $j('<div/>').attr({
						  				'class':'json_thmb',
						  			});
						  			this_div.append($j('<img/>').attr('src',feed.default_image));
						  			$j('#'+output_div+'_'+i).append(this_div);
								}
				  		}
				  		
				  		if(this_feed[i].custom_fields.bento_excerpt){
					  		this_excerpt = this_feed[i].custom_fields.bento_excerpt[0];
				  		}else{
					  		this_excerpt = getExcerpt(this_feed[i].excerpt,200);
				  		}
				  		
				  		if(feed.source_name && feed.source_url){
				  			source = $j('<h3/>');
				  			source.append($j('<a/>').attr({
				  				'href':feed.source_url,
				  				'target':_blank
				  			}));
				  			$j('#'+output_div+'_'+i).append(source);
				  		}else if (feed.source_name){
				  			source = $j('<h3/>');
				  			source.text(feed.source_name);
				  			$j('#'+output_div+'_'+i).append(source);
				  		}
				  		title = $j('<div/>').attr({
				  			'id':output_div+'_'+i+'_title',
				  			'class':'rss_title',
				  		});
				  		title.append($j('<a/>').attr({
				  			'href':this_feed[i].url
				  		}).text(this_feed[i].title));
				  		
				  		excerpt = $j('<p/>').attr({
				  			'id':output_div+'_'+i+'_excerpt'
				  		});
				  		excerpt.text(this_excerpt);
				  		
				  		
				  		$j('#'+output_div+'_'+i).append(title,excerpt);
				  		
				  		if(feed.read_more_text != ""){
				  			this_div = $j('<div/>').attr({
				  				'class':feed.read_more_class,
				  			}).append($j('<a/>').attr({
				  				'href':this_feed[i].url
				  			}).text(feed.read_more_text));
				  			$j('#'+output_div+'_'+i).append(this_div);
				  		}
				  		
				  		
					  }else{
					  	//console.log("JSON Titles")
							$j("#"+output_div).append('<li><a id="'+output_div+'_'+i+'" href="'+this_feed[i].url+'" target="_blank" onmouseover="marquis(\''+output_div+'_'+i+'\')" onmouseout="marquis(\''+output_div+'_'+i+'\',\'reset\')">'+this_feed[i].title+'</a></li>');
							if(feed.source_name != ""){
								$j("#"+output_div).append('<span style="float:left">'+feed.source_title+'</span>');
								
							}
					  }
				}



			}else{
				articles = feed.data.responseData.feed.entries;
				console.log(articles);
				if(count == -1 || count > articles.length){count = articles.length;}
					if(display == "video-grid"){
						if(feed.show_title == true){
							if(feed.title_url.length > 0){
								this_title = '<a href="'+feed.title_url+'" target="_blank">'+feed.title+'</a>';
							}else{
								this_title = feed.title;
							}
							$j("#"+output_div).parent().prepend('<h2 class="'+feed.title_class+'" style="'+feed.title_style+'">'+this_title+'</h2>');
						}

						for(var j = 0;j < count; j++){
							$j("#"+output_div).append('<div id="'+output_div+'_'+j+'" class="clearfix rss_video '+feed.item_class+'"></div>');							
							if(articles[j].mediaGroups && articles[j].mediaGroups.length > 0){
								found=0;
								for(var k = 0 ; k < articles[j].mediaGroups[0].contents.length; k++){
									if(articles[j].mediaGroups[0].contents[k].medium == 'video' && found == 0){
										this_vid = articles[j].mediaGroups[0].contents[k].url;
										if(feed.media_override.length > 0){
											console.log('override present');
											for(var m = 0 ; m < feed.media_override.length; m++){
												console.log(m);
												if(feed.media_override[m][0] == 'video' && this_vid.indexOf(feed.media_override[m][1]) >= 0 ){
													console.log('string found');
													this_vid = this_vid.replace(feed.media_override[m][1],feed.media_override[m][2]);
													console.log(this_vid);
												}
											}
											
											
										}
										$j("#"+output_div+'_'+j).append('<div class="rss_vid"><iframe width="220" height="124" src="'+this_vid+'?controls=0&showinfo=0" frameborder="0" allowfullscreen></iframe></div>');
										found=1;
									}
								}
								
							}
							$j("#"+output_div+'_'+j).append('<h3 class="rss_vid_title"><a href="'+articles[j].link+'" target="_blank">'+articles[j].title+'</a></h3><p>'+getExcerpt(articles[j].content,1)+'</p>');

						}


						

					}else if(display == "excerpt"){
						//console.log('RSS Excerpt');
						if(feed.show_title == true){
							if(feed.title_url.length > 0){
								this_title = '<a href="'+feed.title_url+'" target="_blank">'+feed.title+'</a>';
							}else{
								this_title = feed.title;
							}
							$j("#"+output_div).parent().prepend('<h2 class="'+feed.title_class+'" style="'+feed.title_style+'">'+this_title+'</h2>');
						}

						for(var j = 0;j < count; j++){
							if(j == (count - 1)){
								last = "_last";
							}else{
								last = "";
							}
							var child_count = $j("#"+output_div).children().length;
							$j("#"+output_div).append('<div id="'+output_div+'_'+child_count+'" class="clearfix rss_excerpt'+last+' '+feed.item_class+'"></div>');
							if(articles[j].mediaGroups && articles[j].mediaGroups.length > 0){
								for(var k = 0 ; k < articles[j].mediaGroups[0].contents.length; k++){
									if(articles[j].mediaGroups[0].contents[k].medium != 'video'){
										this_thmb = articles[j].mediaGroups[0].contents[k].url;
										$j("#"+output_div+'_'+j).append('<div class="rss_thmb"><img src="'+this_thmb+'"/></div>');										
									}
								}
								
							}else{
								//attempt to find image in content
								var temp = $j('<div/>');
								temp.innerHTML = articles[j].content;
								var img = $j(temp).find('img').first().attr('src');
								if(img){
								$j("#"+output_div+'_'+j).append('<div class="rss_thmb"><img src="'+img+'"/></div>');									
								}else if(feed.default_image){
								$j("#"+output_div+'_'+j).append('<div class="rss_thmb"><img src="'+feed.default_image+'"/></div>');																		
									
								}
							}
							
							
					  		if(feed.source_name && feed.source_url){
						  		source = '<h3><a href="'+feed.source_url+'" target="_blank">'+feed.source_name+'</a></h3>';
					  		}else if (feed.source_name){
						  		source = '<h3>'+feed.source_name+'</h3>';
					  		}else{
						  		source = '';
					  		}

							
							
							$j("#"+output_div+'_'+j).append(source+'<h2 class="rss_title"><a href="'+articles[j].link+'" target="_blank">'+articles[j].title+'</a></h2><p>'+getExcerpt(articles[j].content,4)+'</p>');
					  		if(feed.read_more_text != ""){
						  		$j('#'+output_div+'_'+j).append('<div class="'+feed.read_more_class+'"><a href="'+articles[j].link+'">'+feed.read_more_text+'</a></div>');
						  	}
						}
					}else if(display == "kuvo-excerpt"){
												//console.log('RSS Excerpt');
						if(feed.show_title == true){
							if(feed.title_url.length > 0){
								this_title = '<a href="'+feed.title_url+'" target="_blank">'+feed.title+'</a>';
							}else{
								this_title = feed.title;
							}
							$j("#"+output_div).parent().prepend('<h2 class="'+feed.title_class+'" style="'+feed.title_style+'">'+this_title+'</h2>');
						}

						for(var j = 0;j < count; j++){
							if(j == (count - 1)){
								last = "_last";
							}else{
								last = "";
							}

					  		if(feed.source_name && feed.source_url){
						  		source = '<h3><span style="text-transform:none">From </span><a href="'+feed.source_url+'" target="_blank">'+feed.source_name+'</a></h3>';
					  		}else if (feed.source_name){
						  		source = '<h3><span style="text-transform:none">From </span>'+feed.source_name+'</h3>';
					  		}else{
						  		source = '';
					  		}
					  		var child_count = $j("#"+output_div).children().length;
							$j("#"+output_div).append('<div id="'+output_div+'_'+child_count+'" class="clearfix rss_excerpt'+last+' '+feed.item_class+'"></div>');
							var pub_date = new Date(articles[j].publishedDate);
							$j("#"+output_div+"_"+child_count).attr('data-pubdate',pub_date);
							$j("#"+output_div+'_'+child_count).append('<h2 class="rss_title"><a href="'+articles[j].link+'" target="_blank">'+articles[j].title+'</a></h2>'+source);
							if(articles[j].mediaGroups && articles[j].mediaGroups.length > 0){
								for(var k = 0 ; k < articles[j].mediaGroups[0].contents.length; k++){
									if(articles[j].mediaGroups[0].contents[k].medium != 'video'){
										this_thmb = articles[j].mediaGroups[0].contents[k].url;
										$j("#"+output_div+'_'+child_count).append('<div class="rss_thmb"><img src="'+this_thmb+'"/></div>');										
									}
								}
								
							}else{
								//attempt to find image in content
								var temp = $j('<div/>');
								temp.innerHTML = articles[j].content;
								var img = $j(temp).find('img').first().attr('src');
								if(img){
								$j("#"+output_div+'_'+child_count).append('<div class="rss_thmb"><img src="'+img+'"/></div>');									
								}else if(feed.default_image){
								$j("#"+output_div+'_'+child_count).append('<div class="rss_thmb"><img src="'+feed.default_image+'"/></div>');																		
									
								}
							}
							
							$j("#"+output_div+'_'+child_count).append('<p>'+getExcerpt(articles[j].content,4)+'</p>');
							
							

							
							
					  		if(feed.read_more_text != ""){
						  		$j('#'+output_div+'_'+child_count).append('<div class="'+feed.read_more_class+'"><a href="'+articles[j].link+'">'+feed.read_more_text+'</a></div>');
						  	}
						}

					}else if(display == "feature"){
						//console.log('RSS Excerpt');
						//limit display to one article only...
						count=1;

						
						$j("#"+pub_div).addClass('carousel slide');
						var inner_pub = $j('<div />').attr({
							'class':'carousel-inner'
						});
						
						for(var j = 0;j < count; j++){
							var item_div = $j('<div />').attr({
								'class': 'item active',
								'style':'background-color: #272727; width: 611px; height: 343px'
							});
							
							if(j == (count - 1)){
								last = "_last";
							}else{
								last = "";
							}
					  		
					  		var img_link = $j('<a />').attr({
						  		'href':articles[j].link,
						  		'style':'display: block; margin:auto auto;'
					  		});
					  		
					  		
					  		
							var img_src = feed.default_image;																		
							if(articles[j].mediaGroups && articles[j].mediaGroups.length > 0){
								for(var k = 0 ; k < articles[j].mediaGroups[0].contents.length; k++){
									if(articles[j].mediaGroups[0].contents[k].medium != 'video'){
										var img_src = this_thmb = articles[j].mediaGroups[0].contents[k].url;
									}
								}
								
							}else{
								//attempt to find image in content
								var temp = $j('<div/>');
								temp.innerHTML = articles[j].content;
								var img = $j(temp).find('img').first().attr('src');
								if(img){
								var img_src = img;
								}else if(feed.default_image){
								var img_src = feed.default_image;																		
									
								}
							}
							
					  		var image = $j('<img />').attr({
						  		'src': img_src,
						  		'alt': articles[j].title,
						  		'style': 'display:block; margin:auto auto; padding: 0px 0px'
					  		});
					  		
					  		$j(img_link).append(image);
					  		$j(item_div).append(img_link);
					  		
					  		var caption_div = $j('<div />').attr({
						  		'class': 'carousel-caption'
					  		});
					  		
					  		var cap_title_link = $j('<a />').attr({
						  		'src':articles[j].link,
						  		'alt': articles[j].title,
					  		});
					  		$j(cap_title_link).append('<h2><b>'+articles[j].title+'</b></h2>')
					  		
					  		$j(caption_div).append(cap_title_link);
					  		
					  		var caption = $j('<p />').text(getExcerpt(articles[j].content,2));
					  		
					  		$j(caption_div).append(caption);
					  		
					  		$j(item_div).append(caption_div);
					  								  	
						  	$j(inner_pub).append(item_div);
						  	
						  	
						}
						
						$j('#'+pub_div).append(inner_pub);
						
					}else{
					//console.log('RSS Titles ');
//						if((!feed.parent || (feed.parent && feed.parent.output != "tabs")) && feed.show_title == true){//if not part of tabular group output, generate a title
						if(!feed.parent && feed.show_title == true){//if not part of tabular group output, generate a title
							$j("#"+output_div).append('<h2 class="'+feed.title_class+'" style="'+feed.title_style+'">'+feed.title+'</h2>');
						}
					
						for(var j = 0;j < count; j++){
							source="";
							li_w = "100%";
							if(feed.source_name){
								source = '<div style="width:20%;float:right;white-space:nowrap;padding:0;text-align:right">';
								if(feed.streaming_url){
									source = source + '<a href="'+feed.streaming_url+'" target="_blank" class="streaming_image"><img src="'+feed.streaming_icon+'" height="12" width="11" alt="Listen Now"></a>';
								}
								if(feed.source_url){
									source = source + '<a href="'+feed.source_url+'" target="_blank">';
								}
								source = source+feed.source_name;								
								if(feed.source_url){
									source = source + '</a>';
								}
								source = source+'</div>';
								li_w = "80%";
							}
							$j("#"+output_div).append('<div class="clearfix" style="width:100%;">'+source+'<li style="float:left;width:'+li_w+';"><a id="'+output_div+'_'+j+'" href="'+articles[j].link+'" target="_blank" onmouseover="marquis(\''+output_div+'_'+j+'\')" onmouseout="marquis(\''+output_div+'_'+j+'\',\'reset\')">'+articles[j].title+'</a></li></div>');
						}
					}
				
			}
			if(feed.parent && feed.parent.output == "aggregate"){
//		  		$j("#"+pub_div).children().sort(sort_date).appendTo("#"+pub_div);
		  		$j("#"+pub_div+" > div").sort(function(a,b) {
			  		console.log('sorting:'+a.dataset.pubdate);
		  			return a.dataset.pubdate < b.dataset.pubdate;
		  			}).appendTo("#"+pub_div);
		  		function sort_date(a, b){
		  			return a.dataset.pubDate < b.dataset.pubDate ? 1 : -1;    
		  		}
			}
			
			if(feed.parent && feed.parent.output == "tabs"){
			  $j("#"+pub_div+"").tabs("refresh");
			  $j("#"+pub_div+"").tabs("option","active",0);
	  		}	

			
		});
	}

}

function slugify(Text)
{
    return Text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        ;
}

function marquis(obj,reset){
	if(reset){
		$j('#'+obj).css('left',0);		
	}else{
		obj_width = $j('#'+obj).width();
		parent_width = $j('#'+obj).parent().width();
		new_left = parent_width - obj_width - 15;
		if(new_left < 0){
			speed = -new_left/20;
			$j('#'+obj).css({
					'-webkit-transition': 'left '+speed+'s ease',
					'-moz-transition': 'left '+speed+'s ease',
					'-o-transition': 'left '+speed+'s ease',
					'transition': 'left '+speed+'s ease',
			});
			$j('#'+obj).css('left',new_left);
		}
	}
}

function getExcerpt(content, count){
	//strip HTML tags
	var new_content = content.replace(/(<([^>]+)>)/ig,"");
	//remove URLs
	var new_content = new_content.replace(/http:[^\s]*/ig,"");
	
	sentences = new_content.replace(/([.?!])\s*(?=[A-Z])/, "$1|").split("|")
	
	//get first *count* sentences
	return_content = "";
	
	if(sentences.length < count){count = sentences.length}
	
	for(var i = 0 ; i < count; i++){
		return_content = return_content + sentences[i] + ' ';
	}
	
	
//	var new_content = new_content.substring(0, count);
	
//	return new_content;
	return return_content;
}


function wellCrap(){
  console.log("An error occurred while retrieving JSON.");
}
