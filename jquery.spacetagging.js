/*
 * jQuery.spaceTagging 0.1 - slight feature rip-off of HeadSpace2 http://urbangiraffe.com/plugins/headspace2/
 *
 * Copyright (c) 2009 Lim Chee Aun (cheeaun.com)
 * Licensed under the MIT license.
 */

;(function($){
	$.fn.spaceTagging = function(tagsSelector, options){
		
		var defaults = {
			suggestedClass: 'suggested'
		}

		var options = $.extend(defaults, options);
		
		return this.each(function() {
			var tagsInput = $(this);
			var suggestedTagsLinks = $(tagsSelector);
			
			var tagValues = function(val){
				var inputVal = $.trim(tagsInput.val()).toLowerCase();
				if (inputVal === '') return [];
				return $.grep($.map(tagsInput.val().split(','), function(tag, i){
					return $.trim(tag);
				}), function(tag, i){
					return tag !== '';
				});
			};
			
			var suggestedTags = (!suggestedTagsLinks.length) ? [] : $.map(suggestedTagsLinks, function(link, i){
				return $(link).text();
			});

			var highlightSuggests = function(){
			  var tags = tagValues();
			  if (!tags.length) return;
				suggestedTagsLinks.removeClass(options.suggestedClass);
				var filtered = $.grep(tags, function(val, i){
					return $.inArray(val, suggestedTags) != -1;
				});
				if (!filtered.length) return;
				suggestedTagsLinks.each(function(i, el){
					el = $(el);
					if ($.inArray(el.text(), filtered) == -1) return;
					el.addClass(options.suggestedClass);
				});
			};

			highlightSuggests();
			tagsInput.keyup(highlightSuggests);

			suggestedTagsLinks.live('click', function(){
				var el = $(this);
				el.toggleClass(options.suggestedClass);
				var values = tagValues();
				var text = el.text();
				if (el.hasClass(options.suggestedClass)){
					values.push(text);
				} else {
					for (var i = values.length; i--; i){
						if (values[i] === text) values.splice(i, 1);
					}
				}
				var val = (values.length) ? values.join(', ') + ', ' : '';
				tagsInput.focus().val(val);
				return false;
			});
		});
	}
})(jQuery);