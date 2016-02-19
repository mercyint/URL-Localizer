$ = jQuery.noConflict();
var id_seed = 100;

function VideoGrid(id,settings){
	if(!id){
		return console.log('ERROR: VideoGrid(id) requires a valid string for argument "id"');
	}else{
		this.id = id;
	}
	this.videos = {};

	if(!this.settings){
		this.settings = {};
	}
	if(!this.settings['pub_div']){
		this.settings['pub_div'] = 'video-grid-admin';	
	}
	
	this.addVideo = function(){
		var new_vid = new Video();
		this.videos[new_vid.id] = new_vid;
		this.videos[new_vid.id].parent = this.id;
		this.videos[new_vid.id].renderAdmin();
		
//		this.videos[id] = new Video(type,id,settings);
	}
	
	this.removeVideo = function(id){

		$('#'+id).remove();
		delete this.videos[id];
		this.updateFormField();
	}
	this.renderAdmin = function(){
		target = $('#'+this.settings['pub_div']);
		

		for(var video in this.videos){
			this.videos[video].renderAdmin();
		}
				
		target.after('<a class="add_button" id="add_button" onclick="'+this.id+'.addVideo()">Add Video</a>');
		
	}
	
	this.renderGrid = function(pub_div){
		var output_div = $('#'+pub_div);
		var grid_div = $('<div />').addClass('video-grid clearfix');
		
		for(var video in this.videos){
			var cell_div = $('<div />').addClass('grid-cell');
			var vid_div = $('<div />').addClass('grid-vid');//image wrapper (table)
			var vid_wrap = $('<div />').addClass('grid-vid-wrapper');//image wrapper (table-cell)
			if(this.videos[video].settings['highres']){
			var vid_img = $('<img />').attr({
				'src':this.videos[video].settings['highres']
			});
			}else{
			var vid_img = $('<img />').attr({
				'src':this.videos[video].settings['thumbnail']
			});
			}
/*			vid_wrap.append(vid_img);
			vid_div.append(vid_wrap);*/
			vid_div.append(vid_img);
			cell_div.append(vid_div);
			
			var overlay_div = $('<div />').addClass('grid-vid-overlay');
			var title_h3 = $('<h3 />').text(this.videos[video].settings['title']);
			overlay_div.append(title_h3);
			
			if(this.videos[video].settings['yt_id']){
				var href = "https://www.youtube.com/watch?v="+this.videos[video].settings['yt_id'];
			}else{
				var href = '';
			}
			
			var link = $('<a />').attr({
				'href': href,
				'rel' : 'prettyPhoto'
			});
			
			var button = $('<button />').text('Watch Now');
			link.append(button);
			overlay_div.append(link);
			
			var description = $('<p />').text(this.videos[video].settings['description']);
			
			overlay_div.append(description);
			
			cell_div.append(overlay_div);
			
			grid_div.append(cell_div);
		}

		output_div.append(grid_div);
		
	}
	
	this.updateFormField = function(){
				
		this_grid = eval(this.id);
		var grid_obj = {};
		var vid_str = JSON.stringify(this.videos);
		grid_obj['videos'] = this.videos;
		grid_obj['id'] = this.id;
		grid_obj['settings'] = this.settings;
		
		var video_grid_dict_string = JSON.stringify(grid_obj);
		
		if(video_grid_dict_string){
  		  $('#var_'+this.id).val(JSON.stringify(grid_obj));
		}
	}
	
	this.buildGrid = function(json){
		var obj = JSON.parse(json);
		console.log(obj);

		for(var video in obj.videos){
			if(obj.videos[video].settings['yt_id']){
				var vid_id = obj.videos[video].settings['yt_id'];
			}else{
				var vid_id = obj.videos[video].id;
				id_seed = id_seed + 5;
			}			
			var this_vid = new Video(vid_id);
			this_vid.parent = this.id;
			this_vid.type = obj.videos[video].type;
			this_vid.settings = obj.videos[video].settings;
			
			this.videos[this_vid.id] = this_vid;
			
		}
	}
	
	
	
}


function Video(id){
	this.parent;
	this.pub_div = 'single-video-admin';
	this.type = "test";
	if(id){
		this.id = id;
	}else{
		this.id = 'vid'+ id_seed++;	
	}
	
	
	if(!this.settings){
		this.settings = {};
	}
	if(!this.settings['yt_id']){
		this.settings['yt_id'] = '';
	}
	
	this.renderAdmin = function(){
		if(this.parent){
			var pub_div = $('#'+eval(this.parent).settings['pub_div']);
		}else{
			var pub_div = $('#'+this.pub_div);
		}
		
			var vid_id = this.id;
			
			var vid_div = $('<div />').attr({
				'id':vid_id,
				'class':'vid_admin'
			});
			
			if(this.settings['title']){
				var vid_title = $('<h2 />').text('Video: '+this.settings['title']);
			}else{
				var vid_title = $('<h2 />').text('New Video');
			}
			
			if(this.parent){
				var delete_button = $('<span />').addClass('delete');
				delete_button.append('<a onclick="'+this.parent+'.removeVideo(\''+this.id+'\')">Delete</a>');
				vid_title.append(delete_button);
			}

			vid_div.append(vid_title);

			var type_select = $('<select />').attr({
				'id': vid_id+'_type',
				'data-video-id':vid_id,
				'data-video-grid-id':this.parent
			}).unbind('change').bind('change',function(e){
				var this_id = $(this).attr('id');
				var this_vid = $('#'+this_id).attr('data-video-id');
				var this_grid = $('#'+this_id).attr('data-video-grid-id');
				
				var this_type = $('#'+this_id+' option:selected').text();
				
				if(this_type == "Merlin/COVE"){
					this_type = 'merlin';
				}else if(this_type = "YouTube"){
					this_type = 'youtube';
				}
				
				if(this_grid){
					eval(this_grid+'.videos["'+this_vid+'"]').type = this_type;
					eval(this_grid+'.videos["'+this_vid+'"]').updateAdmin();
				}else{
					eval(this_vid).type = this_type;
					eval(this_vid).updateAdmin();
					
				}
				
			});
			
			if(this.type == 'merlin'){
				var mer_select = " selected";
			}else{
				var mer_select = "";
			}
			if(this.type == 'youtube'){
				var yt_select = " selected";
			}else{
				var yt_select = "";
			}
			
			type_select.append('<option>Choose video format</option><option'+mer_select+'>Merlin/COVE</option><option'+yt_select+'>YouTube</option>');
//			vid_div.append(type_select);
			
			var vid_info = $('<div />').attr({
				'id':this.id+'_info'
			}).addClass('vid_info clearfix');
			vid_info.append(type_select);
			if(this.type == 'merlin'){
				vid_info.append(this.renderMerlinAdmin());
			}else if (this.type == 'youtube'){
				vid_info.append(this.renderYouTubeAdmin());
			}else{
				vid_info.append('Please choose a video format.');
			}
			
			vid_div.append(vid_info);
			
			pub_div.append(vid_div);
		
	}
	
	this.renderMerlinAdmin = function(){
		return 'Merlin Admin';
	}
	this.renderYouTubeAdmin = function(){
		var yt_admin = $('<div />').css('position','relative').attr({
			'id':this.id+'_data'
		});
		
		var yt_search = $('<input />').attr({
			'id': 'yt_search_'+this.id,
			'data-video-id': this.id,
			'data-grid-id': this.parent
		});
		if(this.settings['yt_id'] != ''){
			yt_search.val(this.settings['yt_id']);
		}else{
			yt_search.val('Search YouTube').focus(function(){
				$(this).val('');
			});
		}
		/* YouTube Search Field functionality */
		yt_search.keyup(function(e){
			var vid_id = $(this).attr('data-video-id');
			
			if($(this).val().length > 3 || e.keyCode == 13){
				var vid_id = $(this).attr('data-video-id');
				var grid_id = $(this).attr('data-grid-id');
				var results = $.ajax({
				  url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q='+$(this).val()+'&key=AIzaSyD34jqwxGqk05ZZJs7e-W23m9T7IuorJkI'
				})
				.success(function(data){
					var result_div = eval('$("#yt_results_'+vid_id+'")').addClass('yt_results');
					result_div.empty();
					var results = data.items;
					for(var i = 0 ; i < results.length; i++){
						var this_item = $('<div />').attr({
							'data-video-id':vid_id,
							'data-grid-id':grid_id,
							'data-yt-id':results[i].id.videoId,
							'data-yt-title':results[i].snippet.title,
							'data-yt-desc':results[i].snippet.description,
							'data-yt-thumb':results[i].snippet.thumbnails.default.url,
							'data-yt-high':results[i].snippet.thumbnails.high.url,
							'class':'yt-search-item clearfix'
						}).click(function(e){
							var this_grid = eval(e.currentTarget.dataset.gridId);
							if(this_grid){
							var this_vid = this_grid.videos[e.currentTarget.dataset.videoId];
							}else{
							var this_vid = eval(e.currentTarget.dataset.videoId);
							}
							this_vid.settings['yt_id'] = e.currentTarget.dataset.ytId;
							this_vid.settings['title'] = e.currentTarget.dataset.ytTitle;
							this_vid.settings['description'] = e.currentTarget.dataset.ytDesc;
							this_vid.settings['thumbnail'] = e.currentTarget.dataset.ytThumb;
							this_vid.settings['highres'] = e.currentTarget.dataset.ytHigh;
							$('#'+this_vid.id+' > h2').text('Video: '+ e.currentTarget.dataset.ytTitle);
							if(this_grid){
								var delete_button = $('<span />').addClass('delete');
								delete_button.append('<a onclick="'+this_grid.id+'.removeVideo(\''+this_vid.id+'\')">Delete</a>');
								$('#'+this_vid.id+' > h2').append(delete_button);
							}
							this_vid.updateAdmin();
							if(this_grid){
								this_grid.updateFormField();
							}else{
								this_vid.updateFormField();
							}
						});
						var this_img = $('<img />').attr({
							'src':results[i].snippet.thumbnails.default.url
						});
						var this_title = $('<h3 />').text(results[i].snippet.title)
						var this_desc = $('<p />').text(results[i].snippet.description);
						
						this_item.append(this_img);
						this_item.append(this_title);
						this_item.append(this_desc);
						
						result_div.append(this_item);
					}
					
					
				});
				
//				result_div.html($(this).val());
				
			}
			
		});
		
		var yt_results = $('<div />').attr({
			'id': 'yt_results_'+this.id
		});
		
		
		yt_admin.append(yt_search);
		yt_admin.append(yt_results);
	
		/* END YouTube search functionality */
		var yt_info = $('<div />');
		if(this.settings['thumbnail']){
			this_img = $('<img />').attr({
				'src': this.settings['thumbnail']
			});
			yt_info.append(this_img);
		}

		var id_div = $('<div />');
		var id_label = $('<label />').text('YouTube ID:');
		var ytid = $('<input />').attr({
			'id':'vid_'+this.id+'_id',
			'data-video-id': this.id,
			'data-grid-id': this.parent
			}).unbind('change').bind('change',function(e){
				var this_ytid = eval(e.currentTarget.id);
				var this_grid = eval(e.currentTarget.dataset.gridId);
				
				if(this_grid){
					var this_vid = this_grid.videos[e.currentTarget.dataset.videoId];
				}else{
					var this_vid = eval(e.currentTarget.dataset.videoId);
				}
				this_vid.settings['yt_id'] = $(this_ytid).val();
				
				if(this_grid){
					this_grid.updateFormField();
				}else{
					this_vid.updateFormField();
				}
				
			});
		
		if(this.settings['yt_id']){
			ytid.val(this.settings['yt_id']);
		}
		id_div.append(id_label);
		id_div.append(ytid);
		
		yt_info.append(id_div);

		
		var title_div = $('<div />');
		var title_label = $('<label />').text('Title:');
		var title = $('<input />').attr({
			'id':'vid_'+this.id+'_title',
			'data-video-id': this.id,
			'data-grid-id': this.parent
			}).unbind('change').bind('change',function(e){
				var this_title = eval(e.currentTarget.id);
				var this_grid = eval(e.currentTarget.dataset.gridId);
				
				if(this_grid){
					var this_vid = this_grid.videos[e.currentTarget.dataset.videoId];
				}else{
					var this_vid = eval(e.currentTarget.dataset.videoId);
				}
				this_vid.settings['title'] = escapeHtml($(this_title).val());
				
				if(this_grid){
					this_grid.updateFormField();
				}else{
					this_vid.updateFormField();
				}
				
			});
		
		if(this.settings['title']){
			title.val(this.settings['title']);
		}
		title_div.append(title_label);
		title_div.append(title);
		
		yt_info.append(title_div);

		var desc_div = $('<div />');
		var desc_label = $('<label />').text('Description:');
		var desc = $('<input />').attr({
			'id':'vid_'+this.id+'_desc',
			'data-video-id': this.id,
			'data-grid-id': this.parent
			}).unbind('change').bind('change',function(e){
				var this_desc = eval(e.currentTarget.id);
				var this_grid = eval(e.currentTarget.dataset.gridId);
				
				if(this_grid){
					var this_vid = this_grid.videos[e.currentTarget.dataset.videoId];
				}else{
					var this_vid = eval(e.currentTarget.dataset.videoId);
				}
				this_vid.settings['description'] = escapeHtml($(this_desc).val());
				
				if(this_grid){
					this_grid.updateFormField();
				}else{
					this_vid.updateFormField();
				}
				
			});
		
		if(this.settings['description']){
			desc.val(this.settings['description']);
		}
		desc_div.append(desc_label);
		desc_div.append(desc);
		
		yt_info.append(desc_div);

		var img_div = $('<div />');
		var img_label = $('<label />').text('Image URL:');
		var img = $('<input />').attr({
			'id':'vid_'+this.id+'_img',
			'data-video-id': this.id,
			'data-grid-id': this.parent
			}).unbind('change').bind('change',function(e){
				var this_img = eval(e.currentTarget.id);
				var this_grid = eval(e.currentTarget.dataset.gridId);
				
				if(this_grid){
					var this_vid = this_grid.videos[e.currentTarget.dataset.videoId];
				}else{
					var this_vid = eval(e.currentTarget.dataset.videoId);
				}
				this_vid.settings['highres'] = $(this_img).val();
				
				if(this_grid){
					this_grid.updateFormField();
				}else{
					this_vid.updateFormField();
				}
				
			});
		
		if(this.settings['highres']){
			img.val(this.settings['highres']);
		}
		img_div.append(img_label);
		img_div.append(img);
		
		yt_info.append(img_div);


		
		yt_admin.append(yt_info);
		
		return yt_admin;
	}
	
	this.updateAdmin = function(){
		var vid_info = $('#'+this.id+'_info');
		var vid_data = $('#'+this.id+'_data');
		vid_data.remove();
		
		if(this.type == 'merlin'){
			vid_info.append(this.renderMerlinAdmin());
		}else if (this.type == 'youtube'){
			vid_info.append(this.renderYouTubeAdmin());
		}else{
			vid_info.append('Please choose a video format.');
		}
		
		if(!this.parent){
		  this.updateFormField();	
		}
		
		
	}
	
	this.updateFormField = function(){
		//Used for videos when not in a grid
		var video_dict_string = JSON.stringify(this);
		
		if(video_dict_string){
			console.log("updateFormField:"+video_dict_string);
  		  $('#var_'+this.id).val(JSON.stringify(this));
		}
		
	}
	
}

 var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };
  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

