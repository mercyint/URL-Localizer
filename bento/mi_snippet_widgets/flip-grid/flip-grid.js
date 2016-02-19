$ = jQuery.noConflict();
var id_seed = 100;


function FlipGrid(id){
	if(!id){
		return console.log('ERROR: FlipGrid(id) requires a valid string for argument "id"');
	}else{
		this.id = id;
	}
	this.cards = {};

	if(!this.settings){
		this.settings = {};
	}
	if(!this.settings['pub_div']){
		this.settings['pub_div'] = 'flip-grid-admin';	
	}
	if(!this.settings['display']){
		this.settings['display'] = "grid";
	}
	
	this.addCard = function(){
		var new_card = new Card();
		this.cards[new_card.id] = new_card;
		console.log(this.id);
		this.cards[new_card.id].parent = this.id;
		this.cards[new_card.id].renderAdmin();
	}
	
	this.renderAdmin = function(){
		target = $('#'+this.settings['pub_div']);
		

		for(var card in this.cards){
			this.cards[card].renderAdmin();
		}
				
		target.after('<a class="add_button" id="add_button" onclick="'+this.id+'.addCard()">Add Card</a>');
	}
	
	this.updateFormField = function(){
		this_grid = eval(this.id);
		var grid_obj = {};
		grid_obj['cards'] = this.cards;
		grid_obj['id'] = this.id;
		grid_obj['settings'] = this.settings;
		
		var flip_grid_dict_string = JSON.stringify(grid_obj);
		
		if(flip_grid_dict_string){
  		  $('#var_'+this.id).val(JSON.stringify(grid_obj));
		}
	}
	
	this.removeCard = function(id){
		$('#'+id).remove();
		delete this.cards[id];
		this.updateFormField();
	}
	
	this.renderGrid = function(pub_div){
		if(!pub_div){
			return console.log('ERROR: Method FlipGrid.renderGrid(pub_div) requires a valid string for argument "pub_div"');
		}else{
			var output_div = $('#'+pub_div);
		}
		var grid_div = $('<div />').addClass('video-grid clearfix');
		
		for(var card in this.cards){
			var cell_div = $('<div />').addClass('flip-container grid-cell').attr('ontouchstart','this.classList.toggle("hover");');
			var card_div = $('<div />').addClass('flipper');
			var front_div = $('<div />').addClass('front');
			if(this.cards[card].settings['image']){

				var card_img = $('<img />').attr({
					'src':this.cards[card].settings['image']
				});
				front_div.append(card_img);
			}
			
			card_div.append(front_div);
			
			var back_div = $('<div />').addClass('back');
			var quote_p = $('<p/>').text(this.cards[card].settings['quote']).addClass('quote');
			var q_source = $('<p />').text(this.cards[card].settings['q_source']).addClass('source');
			back_div.append(quote_p);
			back_div.append(q_source);
			
			card_div.append(back_div);
			
			cell_div.append(card_div);
			
			grid_div.prepend(cell_div);
		}

		output_div.append(grid_div);
		
	}
	
	this.buildGrid = function(json){
		var obj = JSON.parse(json);

		for(var card in obj.cards){

			var card_id = obj.cards[card].id;
			id_seed = id_seed + 5;
			var this_card = new Card(card_id);
			this_card.parent = this.id;
			this_card.settings = obj.cards[card].settings;
			
			this.cards[this_card.id] = this_card;
			
		}
	}
	
}

function Card(id){
	this.parent;
	this.pub_div = 'single-card-admin';
	if(id){
		this.id = id;
	}else{
		this.id = 'card'+ id_seed++;	
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
		
		var card_id = this.id;
		
		var card_div = $('<div />').attr({
			'id':card_id,
			'class':'card_admin'
		});
		
		if(this.settings['q_source']){
			var card_q_source = $('<h2 />').text(this.settings['q_source']);
		}else{
			var card_q_source = $('<h2 />').text('New Card');
		}
		
		if(this.parent){
			var delete_button = $('<span />').addClass('delete');
			delete_button.append('<a onclick="'+this.parent+'.removeFlip(\''+this.id+'\')">Delete</a>');
			card_q_source.append(delete_button);
		}

		card_div.append(card_q_source);

		
		var card_info = $('<div />').attr({
			'id':this.id+'_info'
		}).addClass('card_info clearfix');


		if(this.settings['image']){
			this_img = $('<img />').attr({
				'src': this.settings['image']
			});
			card_info.append(this_img);
		}
		
		var q_source_div = $('<div />');
		var q_source_label = $('<label />').text('Source:');
		var q_source = $('<input />').attr({
			'id':'card_'+this.id+'_q_source',
			'data-card-id': this.id,
			'data-grid-id': this.parent
			}).unbind('change').bind('change',function(e){
				var this_q_source = eval(e.currentTarget.id);
				var this_grid = eval(e.currentTarget.dataset.gridId);
				
				if(this_grid){
					var this_card = this_grid.cards[e.currentTarget.dataset.cardId];
				}else{
					var this_card = eval(e.currentTarget.dataset.cardId);
				}
				this_card.settings['q_source'] = escapeHtml($(this_q_source).val());
				
				if(this_grid){
					this_grid.updateFormField();
				}else{
					this_card.updateFormField();
				}
				
			});
		
		if(this.settings['q_source']){
			q_source.val(this.settings['q_source']);
		}
		q_source_div.append(q_source_label);
		q_source_div.append(q_source);
		
		card_info.append(q_source_div);

		var quote_div = $('<div />');
		var quote_label = $('<label />').text('Quote:');
		var quote = $('<input />').attr({
			'id':'card_'+this.id+'_quote',
			'data-card-id': this.id,
			'data-grid-id': this.parent
			}).unbind('change').bind('change',function(e){
				var this_quote = eval(e.currentTarget.id);
				var this_grid = eval(e.currentTarget.dataset.gridId);
				
				if(this_grid){
					var this_card = this_grid.cards[e.currentTarget.dataset.cardId];
				}else{
					var this_card = eval(e.currentTarget.dataset.cardId);
				}
				this_card.settings['quote'] = escapeHtml($(this_quote).val());
				
				if(this_grid){
					this_grid.updateFormField();
				}else{
					this_card.updateFormField();
				}
				
			});
		
		if(this.settings['quote']){
			quote.val(this.settings['quote']);
		}
		quote_div.append(quote_label);
		quote_div.append(quote);
		
		card_info.append(quote_div);

		var img_div = $('<div />');
		var img_label = $('<label />').text('Image:');
		var img = $('<input />').attr({
			'id':'card_'+this.id+'_img',
			'data-card-id': this.id,
			'data-grid-id': this.parent
			}).unbind('change').bind('change',function(e){
				var this_img = eval(e.currentTarget.id);
				var this_grid = eval(e.currentTarget.dataset.gridId);
				
				if(this_grid){
					var this_card = this_grid.cards[e.currentTarget.dataset.cardId];
				}else{
					var this_card = eval(e.currentTarget.dataset.cardId);
				}
				this_card.settings['image'] = $(this_img).val();
				
				if(this_grid){
					this_grid.updateFormField();
				}else{
					this_card.updateFormField();
				}
				
			});
		
		if(this.settings['image']){
			img.val(this.settings['image']);
		}
		img_div.append(img_label);
		img_div.append(img);
		
		card_info.append(img_div);		

		card_div.append(card_info);
		
		pub_div.append(card_div);
		
	}

	this.updateAdmin = function(){
		
	}

	this.updateFormField = function(){
		//Used for videos when not in a grid
		var card_dict_string = JSON.stringify(this);
		
		if(card_dict_string){
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

