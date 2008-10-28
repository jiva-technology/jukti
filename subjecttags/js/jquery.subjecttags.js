jQuery.fn.subjectTags = function(source){
	
	String.prototype.sanitiseJSON=function() {
		return this.replace(/(")/gi,'\\"')
	}

	String.prototype.stripHTML=function() {
		return this.replace(/(<.+> )/gi,"")
	}

	HELPTEXT_INITIAL = 'Type in a subject name to search, up/down to select, enter to add'
	HELPTEXT_ADD = 'Are you sure you want to add a new subject?'

// 	Get Requested JSON
	
	var jsondata
	
	jQuery.getJSON(source,function(json){ jsondata = json });

// 	Create/Locate Required Elements
	
	inputfield = jQuery(this).children('.subject');
	subjectlist = jQuery(this).children('.subject_list');
	submitbutton = jQuery(this).children('button');
	inputfield.after('<div class="subject_filter"><p>'+HELPTEXT_INITIAL+'</p><ul></ul></div>');
	subjectfilter_wrap = jQuery(this).children('.subject_filter');
	help = subjectfilter_wrap.children('p')
	subjectfilter = subjectfilter_wrap.children('ul')
	subjectfilter_wrap.hide();
	cursoron = false
	
//	 Bind Events To Elements
	
	inputfield.focus(function(e){
		subjectfilter_wrap.show();
	}).blur(function(){
		subjectfilter_wrap.fadeOut(100);
	}).keyup(filter).parents('form').submit(function(){return false;});
	
	submitbutton.click(function(){
		if (!cursoron) addfiltered('Submit Button Clicked');
	});
	
	jQuery('.results a').click(function(){
		subjectli = subjectlist.children('li');
		if (subjectli.length>0) {
			var str = '[';
			subjectli.each(function(index,item){
				str += '"'+jQuery(this).html().stripHTML().sanitiseJSON().toLowerCase()+'"';
				if (index<subjectli.length-1) str += ',';
			})
			str += ']';
			jQuery('.results pre').empty().append(str);
		}
		return false;
	})
	
//	The main bit...

	function filter(e){
		// Filter Functions		
		termtext = jQuery.trim( jQuery(this).val().toLowerCase() )
		term=new RegExp(termtext)
		subjectfilter.empty();
		if ( !termtext ) {
			help.text(HELPTEXT_INITIAL).show();
		} else {
			help.hide();
		  	showmax = 15;
			found = false;
	  		jQuery.each(jsondata, function(index,item){
				if(showmax>0 && term.test(item)) {
					subjectfilter.append('<li class="filterlistitem"><a class="add_subject" href="#">'+highlight(item,termtext)+'</a></li>');
					showmax--;
					found = true;
				} 
	  		});
	  		subjectfilter.children('li').children('a').click(function(){
	  			inputfield.attr('value',jQuery(this).text())
	  			addfiltered('Drop Down Filtered Listitem Clicked');
	  			return false;
	  		})
	  		if (!found) help.text(HELPTEXT_ADD).show();
		}
		
		// Keyboard Functions

		if ((e.keyCode >= 48 && e.keyCode <= 90) || e.keyCode == 8 || e.keyCode == 46) {
			currentindex = 0;
			cursoron = false;	
		}
		
		if (e.keyCode == 38 || e.keyCode == 40) { // 38 up 40 down
			subjectfilterlist = subjectfilter.children('li')
			if (!cursoron) {
				currentindex = 0;
				cursoron = true;	
			} else {
				if (e.keyCode == 38) {
					currentindex--;
					if (currentindex<0) currentindex = 0;
				} else if (e.keyCode == 40) {
					currentindex++;
					if (currentindex>subjectfilterlist.length-1) currentindex = subjectfilterlist.length-1;
				}
			}
			subjectfilterlist.removeClass('listhighlight');
			subjectfilterlist.each(function(index,item){
				if (index==currentindex) {
					jQuery(item).addClass('listhighlight');
				}
			})
		}
		if (e.keyCode == 13) {
			if (!cursoron) {
				addfiltered('Cursor Off, Enter Pressed')
			} else {
				subjectfilterlist.each(function(index,item){
					if (index==currentindex) {
						inputfield.attr('value',jQuery(item).text());
					}
				})
				addfiltered('Cursor On, Enter Pressed')
			}
				subjectfilter.empty();
				help.show();
		}
		
		if (e.keyCode == 37 || e.keyCode == 39) { // 37 left 39 right
			cursoron = false
			currentindex = null
		}
		
		if (e.keyCode == 27) {
			cursoron = false
			currentindex = null
			jQuery(this).blur();
		}
	}

	function addfiltered(from) {
		alreadyexists = false;
		help.text(HELPTEXT_INITIAL);
		value = jQuery(inputfield).attr('value')
		console.log(value.toLowerCase())
		if (value!='') {
			subjectli = subjectlist.children('li');
			subjectli.each(function(index,item){
				console.log(jQuery(this).html().stripHTML().sanitiseJSON().toLowerCase())
				if (jQuery(this).html().stripHTML().sanitiseJSON().toLowerCase()==value.toLowerCase()) {
					alreadyexists = true;
				}
			})
			
			if (!alreadyexists) {
				subjectlist.append('<li><a class="symbol" href="#">&otimes;</a> '+jQuery(inputfield).attr('value').toLowerCase()+'</li>');
				inputfield.attr('value', '')
				subjectlist.children('li').children('a').click(function(){
					jQuery(this).parent().remove();
					return false;
				});
			}	
		}
		return false;
	}
	
	function highlight(html, match) {
		html = html.replace(new RegExp(match, 'gi'), '<strong>'+match+'</strong>')
		return html;
	}
	
};