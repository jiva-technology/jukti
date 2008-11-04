jQuery.fn.numberInput = function(initialValue,lowestValue,highestValue){

	inputEl = jQuery(this);
	
// Create Required Elements

	inputEl.wrap('<div id="numberinput_wrap_'+inputEl.attr('id')+'" class="numberinput_wrap"></div>')
	inputEl.after('<a class="numberinput_up" href="#">Up</a><a class="numberinput_down" href="#">Down</a>');

// Locate/Hide Required Elements

	inputEl.attr('maxlength',5)
	inputEl.attr('size',5)
	if(!inputEl.attr('value')) inputEl.attr('value',initialValue)
	parentEl = inputEl.parent();
	jQuery('label[for='+inputEl.attr('id')+']').hide()
	
// Add eventHandlers

	parentEl.children('.numberinput_up').click(function(){
		currentInputEl = jQuery(this).prevAll('input');
		if ((currentInputEl.attr('value')<highestValue)) {
			currentInputEl.attr('value',Number(currentInputEl.attr('value'))+1)
		}
		return false;
	})

	parentEl.children('.numberinput_down').click(function(){
		currentInputEl = jQuery(this).prevAll('input');
		if ((currentInputEl.attr('value')>lowestValue)) {
			currentInputEl.attr('value',Number(currentInputEl.attr('value'))-1)
		}
		return false;
	})
	
	inputEl.blur(function(){
		if ((jQuery(this).attr('value')>highestValue)) jQuery(this).attr('value',highestValue)
		if ((jQuery(this).attr('value')<lowestValue)) jQuery(this).attr('value',lowestValue)
	})

// Keyboard Input (updown arrows)
	
	inputEl.keyup(function(e){
		if (e.keyCode == 38 || e.keyCode == 40) { // 38 up 40 down
			if (e.keyCode == 38) {
				if ((jQuery(this).attr('value')<highestValue)) jQuery(this).attr('value',Number(jQuery(this).attr('value'))+1)
			} else if (e.keyCode == 40) {
				if ((jQuery(this).attr('value')>lowestValue)) jQuery(this).attr('value',Number(jQuery(this).attr('value'))-1)
			}
		}
	})	
};