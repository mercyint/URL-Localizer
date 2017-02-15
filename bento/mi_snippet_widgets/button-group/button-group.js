$ = jQuery.noConflict();
var id_seed = 100;


function ButtonGroup(id){
	if(!id){
		return console.log('ERROR: ButtonGroup(id) requires a valid string for argument "id"');
	}else{
		this.id = id;
	}
	this.buttons = {};

	if(!this.settings){
		this.settings = {};
	}
	if(!this.settings['pub_div']){
		this.settings['pub_div'] = 'button-group-admin';	
	}
	if(!this.settings['display']){
		this.settings['display'] = "group";
	}
	
	this.addButton = function(){
		var new_button = new Button();
		this.buttons[new_button.id] = new_button;
		console.log(this.id);
		this.buttons[new_button.id].parent = this.id;
		this.buttons[new_button.id].renderAdmin();
	}
	
	this.renderAdmin = function(){
		target = $('#'+this.settings['pub_div']);
		

		for(var button in this.buttons){
			this.buttons[button].renderAdmin();
		}
				
		target.after('<a class="add_button" id="add_button" onclick="'+this.id+'.addButton()">Add Button</a>');
	}
	
	this.updateFormField = function(){
		this_group = eval(this.id);
		var group_obj = {};
		group_obj['buttons'] = this.buttons;
		group_obj['id'] = this.id;
		group_obj['settings'] = this.settings;
		
		var button_group_dict_string = JSON.stringify(group_obj);
		
		if(button_group_dict_string){
  		  $('#var_'+this.id).val(JSON.stringify(group_obj));
		}
	}
	
	this.removeButton = function(id){
		$('#'+id).remove();
		delete this.buttons[id];
		this.updateFormField();
	}
	
	this.renderGroup = function(pub_div){
		if(!pub_div){
			return console.log('ERROR: Method ButtonGroup.renderGroup(pub_div) requires a valid string for argument "pub_div"');
		}else{
			var output_div = $('#'+pub_div);
		}
//		var group_div = $('<div />').addClass('video-group clearfix');
		
		for(var button in this.buttons){
    		var button_el = $('<button />').addClass('btn');
    		if(this.buttons[button].settings['style']){
        		button_el.addClass('btn-'+this.buttons[button].settings['style']);
    		}else{
        		button_el.addClass('btn-default');
    		}
    		if(this.buttons[button].settings['size']){
        		button_el.addClass('btn-'+this.buttons[button].settings['size']);
    		}
    		var link_el = $('<a />').attr({
        		'href':this.buttons[button].settings['url'],
    		}).text(this.buttons[button].settings['label']);
    		if(this.buttons[button].settings['target']){
        		link_el.attr('target','_blank');
    		}
    		
    		button_el.append(link_el);
    		
            output_div.append(button_el);
    		
			
//			group_div.prepend(cell_div);
		}

//		output_div.append(group_div);
		
	}
	
	this.buildGroup = function(json){
		var obj = JSON.parse(json);

		for(var button in obj.buttons){

			var button_id = obj.buttons[button].id;
			id_seed = id_seed + 5;
			var this_button = new Button(button_id);
			this_button.parent = this.id;
			this_button.type = obj.buttons[button].type;
			this_button.settings = obj.buttons[button].settings;
			
			this.buttons[this_button.id] = this_button;
			
		}
	}
	
}

function Button(id){
	this.parent;
	this.pub_div = 'single-button-admin';
	this.type = "test";
	if(id){
		this.id = id;
	}else{
		this.id = 'button'+ id_seed++;	
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
		
		var button_id = this.id;
		
		var button_div = $('<div />').attr({
			'id':button_id,
			'class':'button_admin'
		});
		
		if(this.settings['label']){
			var button_title = $('<h2 />').text(this.settings['label']);
		}else{
			var button_title = $('<h2 />').text('New Button');
		}
		
		if(this.parent){
			var delete_button = $('<span />').addClass('delete');
			delete_button.append('<a onclick="'+this.parent+'.removeButton(\''+this.id+'\')">Delete</a>');
			button_title.append(delete_button);
		}

		button_div.append(button_title);

		
		var button_info = $('<div />').attr({
			'id':this.id+'_info'
		}).addClass('button_info clearfix');


		var label_div = $('<div />');
		var label_label = $('<label />').text('Label:');
		var label = $('<input />').attr({
			'id':'button_'+this.id+'_label',
			'data-button-id': this.id,
			'data-group-id': this.parent
			}).unbind('change').bind('change',function(e){
				var this_label = eval(e.currentTarget.id);
				var this_group = eval(e.currentTarget.dataset.groupId);
				
				if(this_group){
					var this_button = this_group.buttons[e.currentTarget.dataset.buttonId];
				}else{
					var this_button = eval(e.currentTarget.dataset.buttonId);
				}
				this_button.settings['label'] = escapeHtml($(this_label).val());
				
				if(this_group){
					this_group.updateFormField();
				}else{
					this_button.updateFormField();
				}
				
			});
		
		if(this.settings['label']){
			label.val(this.settings['label']);
		}
		label_div.append(label_label);
		label_div.append(label);
		
		button_info.append(label_div);

		var link_div = $('<div />');
		var link_label = $('<label />').text('URL:');
		var link = $('<input />').attr({
			'id':'button_'+this.id+'_link',
			'data-button-id': this.id,
			'data-group-id': this.parent
			}).unbind('change').bind('change',function(e){
				var this_img = eval(e.currentTarget.id);
				var this_group = eval(e.currentTarget.dataset.groupId);
				
				if(this_group){
					var this_button = this_group.buttons[e.currentTarget.dataset.buttonId];
				}else{
					var this_button = eval(e.currentTarget.dataset.buttonId);
				}
				this_button.settings['url'] = $(this_img).val();
				
				if(this_group){
					this_group.updateFormField();
				}else{
					this_button.updateFormField();
				}
				
			});
		
		if(this.settings['url']){
			link.val(this.settings['url']);
		}
		link_div.append(link_label);
		link_div.append(link);
		
		button_info.append(link_div);

		var style_div = $('<div />');
		var style_label = $('<label />').text('Button Style:');
		var style = $('<select />').attr({
			'id':'button_'+this.id+'_style',
			'data-button-id': this.id,
			'data-group-id': this.parent
			}).unbind('change').bind('change',function(e){
				var this_style = eval(e.currentTarget.id);
				var this_group = eval(e.currentTarget.dataset.groupId);
				
				if(this_group){
					var this_button = this_group.buttons[e.currentTarget.dataset.buttonId];
				}else{
					var this_button = eval(e.currentTarget.dataset.buttonId);
				}
				this_button.settings['style'] = $(this_style).val();
				
				if(this_group){
					this_group.updateFormField();
				}else{
					this_button.updateFormField();
				}
				
			});
			
			var options = new Array("default","primary","info","success","warning","danger");
			
			for(opt in options){
    			var this_opt = $("<option />").text(options[opt]);
    			style.append(this_opt);
			}
			
		
		if(this.settings['style']){
			style.val(this.settings['style']);
		}
		style_div.append(style_label);
		style_div.append(style);
		
		button_info.append(style_div);

		var size_div = $('<div />');
		var size_label = $('<label />').text('Button Style:');
		var size = $('<select />').attr({
			'id':'button_'+this.id+'_size',
			'data-button-id': this.id,
			'data-group-id': this.parent
			}).unbind('change').bind('change',function(e){
				var this_size = eval(e.currentTarget.id);
				var this_group = eval(e.currentTarget.dataset.groupId);
				
				if(this_group){
					var this_button = this_group.buttons[e.currentTarget.dataset.buttonId];
				}else{
					var this_button = eval(e.currentTarget.dataset.buttonId);
				}
				this_button.settings['size'] = $(this_size).val();
				
				if(this_group){
					this_group.updateFormField();
				}else{
					this_button.updateFormField();
				}
				
			});
			
			var options = new Array("default","block","lg","sm","xs");
			
			for(opt in options){
    			var this_opt = $("<option />").text(options[opt]);
    			size.append(this_opt);
			}
			
		
		if(this.settings['size']){
			size.val(this.settings['size']);
		}
		size_div.append(size_label);
		size_div.append(size);
		
		button_info.append(size_div);





		var target_div = $('<div />').css('position','relative');
		var target_label = $('<label />').text('New window:');
		var target = $('<input />').attr({
			'id':'button_'+this.id+'_target',
			'data-button-id': this.id,
			'data-group-id': this.parent,
			type:'checkbox',
			class:'ace ace-switch ace-switch-4 btn-empty'
			}).unbind('change').bind('change',function(e){
				var this_target = eval(e.currentTarget.id);
				var this_group = eval(e.currentTarget.dataset.groupId);
				
				if(this_group){
					var this_button = this_group.buttons[e.currentTarget.dataset.buttonId];
				}else{
					var this_button = eval(e.currentTarget.dataset.buttonId);
				}
				this_button.settings['target'] = $(this_target).prop('checked');
				
				if(this_group){
					this_group.updateFormField();
				}else{
					this_button.updateFormField();
				}
				
		});
		var switcher = $('<span />').addClass('lbl');		
		
		if(this.settings['target']){
			target.prop('checked',true);
		}
		
		
		target_div.append(target_label);
		target_div.append(target);
		target_div.append(switcher);

		button_info.append(target_div);
		
		



		button_div.append(button_info);
		
		pub_div.append(button_div);
		
	}

	this.updateAdmin = function(){
		
	}

	this.updateFormField = function(){
		//Used for videos when not in a group
		var button_dict_string = JSON.stringify(this);
		
		if(button_dict_string){
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

