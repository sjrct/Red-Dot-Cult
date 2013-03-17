namespace("Entity.Utils", function() {
	Entity.Utils.applyTexture = function(div, arg) {
		for(var key in arg) {
			$(div).css(key, arg[key]);
		}
	}
});
