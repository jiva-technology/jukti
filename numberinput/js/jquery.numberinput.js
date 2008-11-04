jQuery.fn.numberInput = function(initialValue,lowestValue,highestValue){

// Locate/Hide Required Elements

	inputEl = jQuery(this);
	inputEl.attr('maxlength',5)
	inputEl.attr('size',5)
	if(!inputEl.attr('value')) inputEl.attr('value',initialValue)
	inputEl.parent().children('label[for='+inputEl.attr('id')+']').hide()
	
// Create Required Elements

	inputEl.wrap('<div class="numberinput_wrap"></div>')
	inputEl.after('<a class="numberinput_up" href="#">Up</a><a class="numberinput_down" href="#">Down</a>');

// Add eventHandlers

	inputEl.parent().children('a.numberinput_up').click(function(){
		if ((inputEl.attr('value')<highestValue)) inputEl.attr('value',Number(inputEl.attr('value'))+1)
		return false;
	})

	inputEl.parent().children('a.numberinput_down').click(function(){
		if ((inputEl.attr('value')>lowestValue)) inputEl.attr('value',Number(inputEl.attr('value'))-1)
		return false;
	})
	
	inputEl.blur(function(){
		if ((inputEl.attr('value')>highestValue)) inputEl.attr('value',highestValue)
		if ((inputEl.attr('value')<lowestValue)) inputEl.attr('value',lowestValue)
	})

// Keyboard Input (updown arrows)
	
	inputEl.keyup(function(e){
		if (e.keyCode == 38 || e.keyCode == 40) { // 38 up 40 down
			if (e.keyCode == 38) {
				if ((inputEl.attr('value')<highestValue)) inputEl.attr('value',Number(inputEl.attr('value'))+1)
			} else if (e.keyCode == 40) {
				if ((inputEl.attr('value')>lowestValue)) inputEl.attr('value',Number(inputEl.attr('value'))-1)
			}
		}
	})
	
};