$ = jQuery.noConflict();
var id_seed = 100;


function StoryGrid(id){
	if(!id){
		return console.log('ERROR: StoryGrid(id) requires a valid string for argument "id"');
	}else{
		this.id = id;
	}
	this.stories = {};

	if(!this.settings){
		this.settings = {};
	}
	if(!this.settings['pub_div']){
		this.settings['pub_div'] = 'story-grid-admin';	
	}
	if(!this.settings['display']){
		this.settings['display'] = "grid";
	}
	
	this.addStory = function(){
		var new_story = new Story();
		this.stories[new_story.id] = new_story;
		console.log(this.id);
		this.stories[new_story.id].parent = this.id;
		this.stories[new_story.id].renderAdmin();
	}
	
	this.renderAdmin = function(){
		target = $('#'+this.settings['pub_div']);
		

		for(var story in this.stories){
			this.stories[story].renderAdmin();
		}
				
		target.after('<a class="add_button" id="add_button" onclick="'+this.id+'.addStory()">Add Article</a>');
	}
	
	this.updateFormField = function(){
		this_grid = eval(this.id);
		var grid_obj = {};
		grid_obj['stories'] = this.stories;
		grid_obj['id'] = this.id;
		grid_obj['settings'] = this.settings;
		
		var story_grid_dict_string = JSON.stringify(grid_obj);
		
		if(story_grid_dict_string){
  		  $('#var_'+this.id).val(JSON.stringify(grid_obj));
		}
	}
	
	this.removeStory = function(id){
		$('#'+id).remove();
		delete this.stories[id];
		this.updateFormField();
	}
	
	this.renderGrid = function(pub_div){
		if(!pub_div){
			return console.log('ERROR: Method StoryGrid.renderGrid(pub_div) requires a valid string for argument "pub_div"');
		}else{
			var output_div = $('#'+pub_div);
		}
		var grid_div = $('<div />').addClass('video-grid clearfix');
		
		for(var story in this.stories){
			var cell_div = $('<div />').addClass('grid-cell');
			var story_div = $('<div />').addClass('grid-story');
			if(this.stories[story].settings['highres']){
				var story_img = $('<img />').attr({
					'src':this.stories[story].settings['highres']
				});
			}else{
				var story_img = $('<img />').attr({
					'src':this.stories[story].settings['thumbnail']
				});
			}
			story_div.append(story_img);
			cell_div.append(story_div);
			
			var overlay_div = $('<div />').addClass('grid-vid-overlay');
			var title_h3 = $('<h3 />').text(this.stories[story].settings['title']);
			overlay_div.append(title_h3);
			
			if(this.stories[story].settings['url']){
				var href = this.stories[story].settings['url'];
			}else{
				var href = '';
			}
			
			var link = $('<a />').attr({
				'href': href,
			});
			
			if(this.stories[story].settings['target']){
				link.attr('target','_blank');
			}
			
			var button = $('<button />').text('Read Now');
			link.append(button);
			overlay_div.append(link);
			
			var description = $('<p />').text(this.stories[story].settings['description']);
			
			overlay_div.append(description);
			
			cell_div.append(overlay_div);
			
			grid_div.prepend(cell_div);
		}

		output_div.append(grid_div);
		
	}
	
	this.buildGrid = function(json){
		var obj = JSON.parse(json);

		for(var story in obj.stories){

			var story_id = obj.stories[story].id;
			id_seed = id_seed + 5;
			var this_story = new Story(story_id);
			this_story.parent = this.id;
			this_story.type = obj.stories[story].type;
			this_story.settings = obj.stories[story].settings;
			
			this.stories[this_story.id] = this_story;
			
		}
	}
	
}

function Story(id){
	this.parent;
	this.pub_div = 'single-story-admin';
	this.type = "test";
	if(id){
		this.id = id;
	}else{
		this.id = 'story'+ id_seed++;	
	}
	if(!this.settings){
		this.settings = {};
	}
	
	
	this.renderAdmin = function(){
		if(this.parent){
			var pub_div = $('#'+eval(this.parent).settings['pub_div']);
		}else{
			var pub_div = $('#'+this.pub_div);
		}
		
		var story_id = this.id;
		
		var story_div = $('<div />').attr({
			'id':story_id,
			'class':'story_admin'
		});
		
		if(this.settings['title']){
			var story_title = $('<h2 />').text(this.settings['title']);
		}else{
			var story_title = $('<h2 />').text('New Story');
		}
		
		if(this.parent){
			var delete_button = $('<span />').addClass('delete');
			delete_button.append('<a onclick="'+this.parent+'.removeStory(\''+this.id+'\')">Delete</a>');
			story_title.append(delete_button);
		}

		story_div.append(story_title);

		
		var story_info = $('<div />').attr({
			'id':this.id+'_info'
		}).addClass('story_info clearfix');


		if(this.settings['thumbnail']){
			this_img = $('<img />').attr({
				'src': this.settings['thumbnail']
			});
			story_info.append(this_img);
		}
		
		var title_div = $('<div />');
		var title_label = $('<label />').text('Title:');
		var title = $('<input />').attr({
			'id':'story_'+this.id+'_title',
			'data-story-id': this.id,
			'data-grid-id': this.parent
			}).unbind('change').bind('change',function(e){
				var this_title = eval(e.currentTarget.id);
				var this_grid = eval(e.currentTarget.dataset.gridId);
				
				if(this_grid){
					var this_story = this_grid.stories[e.currentTarget.dataset.storyId];
				}else{
					var this_story = eval(e.currentTarget.dataset.storyId);
				}
				this_story.settings['title'] = escapeHtml($(this_title).val());
				
				if(this_grid){
					this_grid.updateFormField();
				}else{
					this_story.updateFormField();
				}
				
			});
		
		if(this.settings['title']){
			title.val(this.settings['title']);
		}
		title_div.append(title_label);
		title_div.append(title);
		
		story_info.append(title_div);

		var desc_div = $('<div />');
		var desc_label = $('<label />').text('Description:');
		var desc = $('<input />').attr({
			'id':'story_'+this.id+'_desc',
			'data-story-id': this.id,
			'data-grid-id': this.parent
			}).unbind('change').bind('change',function(e){
				var this_desc = eval(e.currentTarget.id);
				var this_grid = eval(e.currentTarget.dataset.gridId);
				
				if(this_grid){
					var this_story = this_grid.stories[e.currentTarget.dataset.storyId];
				}else{
					var this_story = eval(e.currentTarget.dataset.storyId);
				}
				this_story.settings['description'] = escapeHtml($(this_desc).val());
				
				if(this_grid){
					this_grid.updateFormField();
				}else{
					this_story.updateFormField();
				}
				
			});
		
		if(this.settings['description']){
			desc.val(this.settings['description']);
		}
		desc_div.append(desc_label);
		desc_div.append(desc);
		
		story_info.append(desc_div);

		var img_div = $('<div />');
		var img_label = $('<label />').text('Image:');
		var img = $('<input />').attr({
			'id':'story_'+this.id+'_img',
			'data-story-id': this.id,
			'data-grid-id': this.parent
			}).unbind('change').bind('change',function(e){
				var this_img = eval(e.currentTarget.id);
				var this_grid = eval(e.currentTarget.dataset.gridId);
				
				if(this_grid){
					var this_story = this_grid.stories[e.currentTarget.dataset.storyId];
				}else{
					var this_story = eval(e.currentTarget.dataset.storyId);
				}
				this_story.settings['highres'] = $(this_img).val();
				
				if(this_grid){
					this_grid.updateFormField();
				}else{
					this_story.updateFormField();
				}
				
			});
		
		if(this.settings['highres']){
			img.val(this.settings['highres']);
		}
		img_div.append(img_label);
		img_div.append(img);
		
		story_info.append(img_div);



		var link_div = $('<div />');
		var link_label = $('<label />').text('URL:');
		var link = $('<input />').attr({
			'id':'story_'+this.id+'_link',
			'data-story-id': this.id,
			'data-grid-id': this.parent
			}).unbind('change').bind('change',function(e){
				var this_img = eval(e.currentTarget.id);
				var this_grid = eval(e.currentTarget.dataset.gridId);
				
				if(this_grid){
					var this_story = this_grid.stories[e.currentTarget.dataset.storyId];
				}else{
					var this_story = eval(e.currentTarget.dataset.storyId);
				}
				this_story.settings['url'] = $(this_img).val();
				
				if(this_grid){
					this_grid.updateFormField();
				}else{
					this_story.updateFormField();
				}
				
			});
		
		if(this.settings['url']){
			link.val(this.settings['url']);
		}
		link_div.append(link_label);
		link_div.append(link);
		
		story_info.append(link_div);



		var target_div = $('<div />').css('position','relative');
		var target_label = $('<label />').text('New window:');
		var target = $('<input />').attr({
			'id':'story_'+this.id+'_target',
			'data-story-id': this.id,
			'data-grid-id': this.parent,
			type:'checkbox',
			class:'ace ace-switch ace-switch-4 btn-empty'
			}).unbind('change').bind('change',function(e){
				var this_target = eval(e.currentTarget.id);
				var this_grid = eval(e.currentTarget.dataset.gridId);
				
				if(this_grid){
					var this_story = this_grid.stories[e.currentTarget.dataset.storyId];
				}else{
					var this_story = eval(e.currentTarget.dataset.storyId);
				}
				this_story.settings['target'] = $(this_target).prop('checked');
				
				if(this_grid){
					this_grid.updateFormField();
				}else{
					this_story.updateFormField();
				}
				
		});
		var switcher = $('<span />').addClass('lbl');		
		
		if(this.settings['target']){
			target.prop('checked',true);
		}
		
		
		target_div.append(target_label);
		target_div.append(target);
		target_div.append(switcher);

		story_info.append(target_div);
		
		



		story_div.append(story_info);
		
		pub_div.append(story_div);
		
	}

	this.updateAdmin = function(){
		
	}

	this.updateFormField = function(){
		//Used for videos when not in a grid
		var story_dict_string = JSON.stringify(this);
		
		if(story_dict_string){
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

