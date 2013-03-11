namespace("Entity.Utils", function() {
	// TODO move to global utils
	Entity.Utils.defined = function(item) {
		return typeof item === 'undefined';
	}
	
	// oarg = { bgcolor: '#FFFA', border_color: '#FFF', border_width: X, image: url, opacity: 'XX%'}
	Entity.Utils.applyTexture = function(div, arg) {
		if(defined(arg.bgcolor))
			$(div).css("background-color", arg.bgcolor);
		if(defined(arg.border_color))
			$(div).css("border-color", arg.border_color);
		if(defined(arg.border_width))
			$(div).css("border-width", arg.border_width);
		if(defined(arg.image))
			$(div).css("background-image", arg.image);
		if(defined(arg.opacity))
			$(div).css("opacity", arg.opacity);
	}
});
