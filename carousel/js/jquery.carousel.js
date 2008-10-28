(function($){
	jQuery.fn.carousel = function(callerSettings) {
		settings = $.extend({
			navItems: null,
			nextControl: null,
			previousControl: null,
			sectionWindow: null,
			transitionSpeed: null,
		}, callerSettings || {});
		settings.navItems = $(settings.navItems);
		settings.nextControl = $(settings.nextControl);
		settings.previousControl = $(settings.previousControl);
		settings.current = 0;
		settings.sectionWindow = $(settings.sectionWindow);
		settings.paneQuantity = settings.sectionWindow.children().children().size();
		settings.paneWidth = settings.sectionWindow.width();
		settings.scrollWidth = settings.paneQuantity * settings.paneWidth;

		settings.navItems.children("li").each(function(n){
			$(this).click(function(){
				showSection(n);
			});
		});
		
		$(settings.nextControl).click(function(){
			if (settings.current >= settings.paneQuantity - 1) { showSection(0)}
			else {showSection(settings.current + 1)}
		});
		
		$(settings.previousControl).click(function(){		
			if (settings.current <= 0) {showSection(settings.paneQuantity-1)}
			else {showSection(settings.current - 1)}
		});
		
		showSection(0);
		return this;
	};
	
	var setNav = function()
	{
		settings.navItems.children("li").removeClass("selected");
		settings.navItems.children("li").filter('li:eq('+settings.current+')').addClass('selected')
	}
	
	var showSection = function(index){
		settings.sectionWindow.scrollTo({left: index * settings.paneWidth}, settings.transitionSpeed, {axis:'x'});
		settings.current = index;
		setNav();
	};
	
})(jQuery);