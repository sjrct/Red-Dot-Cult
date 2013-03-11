namespace("Entity.Utils", function() {
	// oarg = { bgcolor: '#FFFA', border_color: '#FFF', border_width: X, image: url, opacity: 'XX%'}
	Entity.Utils.applyTexture = function(div, arg) {
		if(Utils.IsDefined(arg.bgcolor))
			$(div).css("background-color", arg.bgcolor);
		if(Utils.IsDefined(arg.border_color))
			$(div).css("border-color", arg.border_color);
		if(Utils.IsDefined(arg.border_width))
			$(div).css("border-width", arg.border_width);
		if(Utils.IsDefined(arg.image))
			$(div).css("background-image", arg.image);
		if(Utils.IsDefined(arg.opacity))
			$(div).css("opacity", arg.opacity);
	}
});
