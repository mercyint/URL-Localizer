	(function($) {
		
		VideoPicker = {
			init : function(variable_id){
				console.log(variable_id);				
			},
			updateVideoType : function(variable_id){
				var this_select = $('#var_'+variable_id);
				alert('Oh, so you want a '+this_select.selected.value+' now?');
			}
		}

/*	function initializeVideoPicker(variable_id){
		var inputEl = $('#' + variable_id);
        var defaultcolor = inputEl.val() || '#ff0000';
        var colorPickerEl = inputEl.siblings('.color-selector').first();
        var colorBox = colorPickerEl.find('.color-box').first();
        colorPickerEl.ColorPicker({
            color: defaultcolor,
            onChange: function (hsb, hex, rgb) {
                colorBox.css('background-color', '#' + hex);
                inputEl.val('#' + hex);
            }
        });
        colorBox.css('background-color', defaultcolor);
        inputEl.val(defaultcolor);
	}*/
	
	


    SnippetVideoWidget = window.SnippetVideoWidget || {
        validate: function(){ return true; },
        init: VideoPicker.init,
    };


}(django.jQuery || jQuery));


/*function updateVideoType(field_name){
	console.log(field_name);
	console.log($('#var_'+field_name+'_type'));
	var type = $('#var_'+field_name+'_type option:selected').text();
	SnippetWidgetRegistry.deregisterVariable('var_{{ field.name }}');
	if(type == "YouTube"){
		SnippetWidgetRegistry.deregisterVariable('youtubefield', 'var_{{ field.name }}');
		$('#merlin_'+field_name).css('display','none');
		$('#youtube_'+field_name).css('display','block');
	}else{
		SnippetWidgetRegistry.deregisterVariable('merlin', 'var_{{ field.name }}');			
		$('#merlin_'+field_name).css('display','block');
		$('#youtube_'+field_name).css('display','none');
	}
}
*/
SnippetWidgetRegistry.registerWidget('video-field', SnippetVideoWidget);