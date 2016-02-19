
(function($) {

    MerlinLookup = {
        addItem: function(){
            var items = this.getMerlinItems();
            var first = items.filter(":hidden").first();
            first.css("display", "").find('.widget-body').addClass('on');
            first.find('.widget-anchor').removeClass('collapsed');

            var height = first.find('table').outerHeight();
            first.find('.widget-body.on').css('height', height);


            if(items.length == items.filter(":visible").length){
                items.parent().find('.addLink').closest('tr').remove();
            }
        },
        updateAddMore: function(){
            var self = this;
            var items = self.getMerlinItems();
            items.parent().find('.addLink').closest('tr').remove();
            if(items.length > items.filter(':visible').length){
                $("<a></a>")
                    .addClass('addLink btn')
                    .attr('href', 'javascript:void(0)')
                    .text("Add another item (Max "+ items.length + ")")
                    .insertAfter(items.last())
                    .wrap("<tr><td colspan='2'></td></tr>")
                    .click(function(){
                        self.addItem()
                    });
            }
        },
        isItemEmpty: function(elem){
            if(!elem){
                return false;
            }
            var isEmpty = true;
            elem.find('tr.field input, tr.field textarea').each(function(){
                var hasVal = $(this).val() !== '';
                if(hasVal){
                    isEmpty = false;
                    return false;
                }
            });

            return isEmpty;
        },
        getMerlinItems: function(){
            var items = SnippetWidgetRegistry.get_variables('merlin');
            return $('tr[class^="section_"]').filter(function(){
                var variable_id = $(this).attr('class').replace('section_', 'var_');
                return items.indexOf(variable_id) !== -1;
            });
        },
        updateItemsPosition: function(){
            var self = this;
            var items = SnippetWidgetRegistry.get_variables('merlin');
            var allMerlinItems = self.getMerlinItems();

            // replace all sections data to reorder with the original positions
            $.each(items, function (idx, variable_id){
                var original_field_name = variable_id.replace('var_', '').split('_')[0];
                var item = $(allMerlinItems[idx]);
                var current_field_name = item.attr('class').split('_')[1];

                // change section class with the original one
                var initial_title = item.find('.widget-title');
                initial_title.html(
                    initial_title.html()
                        .replace(current_field_name, original_field_name)
                );

                item.find('.widget-header, .widget-body, input, textarea, label, span, a').andSelf().each(function(){
                    var original_elem = $(this).get(0),
                        attributes = original_elem.attributes,
                        attr_name,
                        attr_value,
                        tag_name;

                    // go through all attributes of an element and
                    // replace them with new field name...
                    for(var index=0; index<attributes.length; index++){
                        attr_name = attributes[index].name;
                        attr_value = attributes[index].value;

                        tag_name = typeof $.fn.prop !== "undefined" ?
                                   $(this).prop("tagName") :
                                   this.nodeName;

                        //...except the value and type
                        if(attr_name !== 'value' && attr_name !== "type" && attr_name !== "size" && attr_name !== "maxlength" && attr_name != "style" ){
                            try {
                                $(this).attr(attr_name, attr_value.replace(
                                    current_field_name,
                                    original_field_name
                                ));
                            } catch(e){ }
                        }
                    }
                });

                //reattach lookup handlers to match the new inputs' attributes
                var merlin_vars = SnippetWidgetRegistry.get_variables('merlin');
                $.each(merlin_vars, function(i, variable_id){
                    var field_name = variable_id.replace('var_', '');
                    self.init(field_name);
                    SnippetWidgetRegistry.get_widget_class('filer').init(field_name + "_image");

                });
            });

            toggleEmptyMerlin(3, 'update');
        },
        deleteItem: function(item){
             var items = this.getMerlinItems();

            if(item[0] !== items.last()[0]){
                item.insertAfter(items.last());
            }

            item.find('input').val("");
            item.find('textarea').val("");

            item.hide();
        },
        afterDeleteItem: function(){
            this.updateItemsPosition();
            this.updateAddMore();
        },
         errorMsgHighlight: function() {
            var items = this.getMerlinItems();

            // testing if there is a message error from Filer, if so, we add the "error" class on the input as well
            items.find('.widget-box .invalid_filer_type').each(function(){
                if($(this).html()) {
                    $(this).closest('tr').siblings().each(function(){
                        $(this).find('input, textarea').addClass('error merlin-attr-error');
                    });
                }
            });
        },
        image_default_resize: function(imageEl, value){
            if (! _image_resize_url) {
                imageEl.val(value).trigger('change');
                return;
            }
             $.ajax({
                url: _image_resize_url,
                data: { img_url: value, arg: _resize_args },
                success: function(resized_url) {
                    imageEl.val(resized_url).trigger('change');
                },
                error: function() {
                    imageEl.val(value).trigger('change');
                }
            });
        },
        addMerlinTitleOnTop: function (field_name) {
            var item = $('#' + field_name + '_title');

            if (item.val()) {
                $('.merlin-' + field_name + '-title').text(': ' + $('#' + field_name + '_title').val());
            }
        },
        populate_merlin_data: function (merlin_dict, field_name) {
            var field, key, i, self = this;

            function update_field(field) {
                var max_length = 260;
                var value = '';

                if (field && merlin_dict[field]){
                    value = merlin_dict[field].substring(0, max_length);
                }
                var fieldId = "#" + field_name + "_" + field;
                if (field == 'image') {
                    self.image_default_resize($(fieldId), value);
                } else {
                    $(fieldId).val(value).trigger('change');
                }
            }

            if (cmsplugin_merlin_fields) {
                for (var i in cmsplugin_merlin_fields){
                    if(cmsplugin_merlin_fields.hasOwnProperty(i)){
                        update_field(cmsplugin_merlin_fields[i]);
                    }
                }
            } else if (merlin_dict) {
                for (key in merlin_dict) {
                    update_field(merlin_dict[key])
                }
            }
            this.addMerlinTitleOnTop(field_name);
        },
        deletePopup: function(elem){
            var self = this;
            $( ".widget-box-overlay ").removeClass('hide');
            $( "#dialog-confirm" ).removeClass('hide').dialog({
                resizable: false,
                modal: true,
                closeOnEscape: false,
                title: "Delete item",
                buttons: [
                    {
                        html: "Cancel",
                        "class" : "btn no-radius",
                        click: function() {
                            $( this ).dialog( "close" ).dialog( "destroy").addClass('hide');
                            $( ".widget-box-overlay ").addClass('hide');
                        }
                    },
                    {
                        html: "Confirm",
                        "class" : "btn btn-info no-radius",
                        click: function() {
                            self.deleteItem(elem);
                            self.afterDeleteItem();

                            $(this).dialog( "destroy").addClass('hide');
                            $( ".widget-box-overlay ").addClass('hide');
                        }
                    }
                ]
            })
        },
        dismissPopup: function (win, merlin_dict, field_name) {
            var self = this;
            var merlin_dict_copy = {};
            for (var item in merlin_dict) {
                merlin_dict_copy[item] = merlin_dict[item];
            }
            win.close();

            // run confirmation code in a different thread so the child window can close on FF
            setTimeout(function () {
                var overwrite = true;
                // Check if any field is populated
                for (var i in cmsplugin_merlin_fields){
                    if(cmsplugin_merlin_fields.hasOwnProperty(i)){
                        var selector = "#" + field_name + "_" + cmsplugin_merlin_fields[i];
                        if ($(selector).val()) {
                            overwrite = confirm("Are you sure you want to overwrite " + field_name +" fields ?");
                            break;
                        }
                    }
                }
                if(overwrite) {
                    MerlinLookup.populate_merlin_data(merlin_dict_copy, field_name);
                }
            }, 0);
        },
        openInPopup: function(link, title){
            var win = window.open(
                link.attr("href"),
                title || 'Merlin',
                "height=890,width=900,resizable=yes,scrollbars=no"
            );
            win.focus();
            return false;
        },
        itemToJSON: function(field_name){
            var section = $(".section_" + field_name);
            var json_field = section.find('input.merlinfield_hidden').first();

            var merlin_obj = {};
            section.find('input, textarea').filter('[id^="' + field_name + '"]').each(function(){
                var attr_name = $(this).attr('id').replace(field_name + '_', '');
                if(attr_name && this.value){
                    merlin_obj[attr_name] = this.value;
                }
            });
            var merlin_dict_string = JSON.stringify(merlin_obj);
            if(merlin_dict_string) {
                json_field.val(merlin_dict_string);
            }
        },
        init: function(field_name){
            var self = this;
            var section = $(".section_" + field_name);
            section.find('.merlin-lookup').first().unbind('click').bind('click', function(e){
                e.preventDefault();
                return self.openInPopup($(this));
            });
            section.find('.pmp-lookup').first().unbind('click').bind('click', function(e){
                e.preventDefault();
                return self.openInPopup($(this), 'PMP');
            });
            section.find('.deletelink').unbind('click').bind('click', function(e){
                e.preventDefault();
                return self.deletePopup(section);
            });

            section.find(".widget-anchor").unbind('click').bind('click', function(e){
                e.preventDefault();
                return self.collapseItem(section);
            });
        },
        isRequired: function(fieldEl){
            if (!fieldEl){
                return false;
            }
            var requiredAttr = fieldEl.attr('data-required');
            if (requiredAttr === 'required' || requiredAttr === 'true'){
                return true;
            }
            return false;
        },
        hasRequiredData: function(fieldEl){
            var hasData = true;
            fieldEl.find('tr.field input, tr.field textarea').each(function(){
                var emptyAllowed = $(this).attr('data-allow-empty') === 'true';
                var noVal = $(this).val() === '';
                if(noVal && !emptyAllowed){
                    hasData = false;
                    return false;
                }
            });
            return hasData;
        },
        highlightRequired: function (fieldEl) {

            function highlightInput (input) {
                var emptyAllowed = input.attr('data-allow-empty') === 'true';
                var hasVal = input.val() !== '';

                input.closest('tr').removeClass('has-error');

                if (hasVal || emptyAllowed){
                    input.removeClass('error merlin-attr-error');
                } else {
                    input.addClass('error merlin-attr-error').closest('tr').addClass('has-error');
                }
            }

            fieldEl.find('tr.field input, tr.field textarea')
                .unbind('change')
                .bind('change', function(){
                    var inputEl = $(this);
                    setTimeout(function() { highlightInput(inputEl); }, 0);
                }).each(function () {
                    highlightInput($(this));
                });
        },
         // Adds custom description above the form
        customText: function() {
            var html = '<div class="description widget-main"></div>';
            $('#accordion').before(html);
        },
        // Styles the labels
        labelStyle: function() {
            $('#accordion .field label').each(function(){
                var self = $(this);
                self.html(self.html().replace(/_/g, ' '));
            });
        },

        // Collpsible effect added on all slides
        collapseItem: function(elem) {
            var link = elem.find('.widget-anchor');
            link.toggleClass('collapsed');

            var visibleItem = elem.find('.widget-body');

            var height = $(visibleItem).find('table').outerHeight();

            if (visibleItem.hasClass('on')) {
                visibleItem.css('height', '0').removeClass('on');
            }
            else {
                visibleItem.css('height', height).addClass('on');
            }
        },

        // Adds the custom text and wrappers for making the form **beautiful**
        beautifyForm: function(variable_id) {
            var self = this;
            $('.grouped').parents('tbody').siblings('thead').remove();
            $('.grouped').parents('table').attr('id', 'accordion');
            $('#accordion .widget-box').parent().css('width', $('#accordion .widget-box').outerWidth());

            $('#accordion textarea').resize(function(){
                var item = $(this).parents('.collapse-item');
                if (item.height() > 0) {
                    item.css('height', 'auto');
                }
            });

            self.addModal($('body'));
            self.labelStyle();
        },
        // Add the modal wrappers and the overlay that has to appear when the modal is displayed
        addModal: function(content) {
           var html = '<div id="dialog-confirm" class="hide">';
           html += '<p> Are you sure you want to delete this slide? </p>';
           html += '</div>';
           html += '<div class="widget-box-overlay ui-front hide"></div>';

           content.append(html);
        },
        validate: function(field_name){
            var self = this;
            var section = $(".section_" + field_name);

            if ((self.isRequired(section) || !self.isItemEmpty(section)) && !self.hasRequiredData(section)){
                self.highlightRequired(section);
                return false;
            }

            if (self.isItemEmpty(section)){
                self.deleteItem(section);
            }

            self.itemToJSON(field_name);
            return true;
        }
    }

    function removeAdditionalHelpText() {
        $('.help-text:not(:first)').remove();
    }

    function groupMerlinTogheter(){
        /**
        * MOTO : "United we stand, divided we fall"
        *
        * Group merlin objects togheter in case they are not.
        * This usualy happens when they don't have variable names in alphabetical order
        * in smart snippet.
        * Ex: <!-- SmartSnippets Variables
        *        bac=Select|values=Yes,No
        *        abc=MerlinField
        *        cba=MerlinField
        *        -->
        *   The above will actually be rendered in the admin in the following order:
        *   abc (Merlin)
        *   bac (Select)
        *   cba (Merlin)
        */

        var merlinItems = MerlinLookup.getMerlinItems();

        merlinItems.each(function(iter){
            if(iter > 0){
                $(this).insertAfter($('tr[class^="section_"]:eq('+(iter - 1)+')'));
            }
        });
    }

    function makeSortable(){
        var merlinItems = MerlinLookup.getMerlinItems();
        var item_classes = $.map(merlinItems, function(val, i){
            return "." + $(val).attr('class');
        }).join(',');

        merlinItems.parent().sortable({
            handle: '.widget-drag',
            items: item_classes,
            update: function( event, ui ) {
                if(merlinItems.length < 2){
                    return;
                }
                MerlinLookup.updateItemsPosition();
            }
        });
    }

    function toggleEmptyMerlin(defaultDisplayNo, state){
        var merlinItems = MerlinLookup.getMerlinItems();
        var minimumDisplayNo = Math.min(
            defaultDisplayNo || 0, merlinItems.length);

        merlinItems.each(function(idx){
            var item = $(this);

            if (idx >= minimumDisplayNo) {

                if (state == 'init') {
                    item
                        .css("display", (MerlinLookup.isItemEmpty(item)) ? "none": "")
                        .find('.widget-anchor').addClass('collapsed');
                }
            }
            else {
                if (state == 'init') {
                    item.find('.widget-body').addClass('on');
                }
            }
        });
    }
    //used later
    var saved_var_id;

    SnippetMerlinWidget = window.SnippetMerlinWidget || {
        validate: function(variable_id){
            return MerlinLookup.validate(variable_id.replace('var_', ''));
        },
        init: function(variable_id){
            saved_var_id = variable_id;
            MerlinLookup.init(variable_id.replace('var_', ''));
            MerlinLookup.addMerlinTitleOnTop(variable_id.replace('var_', ''));

        },
        events: {
            preInit: function(){
                removeAdditionalHelpText();
                groupMerlinTogheter();
            },
            postInit: function(){
                toggleEmptyMerlin(3, 'init');
                MerlinLookup.updateAddMore();
                MerlinLookup.customText();
                MerlinLookup.beautifyForm();
                makeSortable();
            },
            postValidate: function() {
                MerlinLookup.afterDeleteItem();
                MerlinLookup.errorMsgHighlight();
            }
        }
    };

    dismissMerlinBrowserPopup = window.dismissMerlinBrowserPopup || MerlinLookup.dismissPopup;

}(jQuery || django.jQuery));

SnippetWidgetRegistry.registerWidget('merlin', SnippetMerlinWidget);

