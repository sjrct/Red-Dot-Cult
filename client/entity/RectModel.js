namespace('Entity', function () {
	
	Entity.RectModel = function(div, model) {
		div.css("position", "relative");
		div.css("margin", "0 auto");
		
		for(var i = 0; i < model.length; i++) {
			div.appendChild(
				create_rectangle(
					model[i].position,
					model[i].rotation,
					model[i].size,
					model[i].style
			));
		}
		return div;
	}
	
	function create_rectangle(pos, rot, size, texture) {
		var div = document.createElement('div');
		
		var border = parseInt(texture.border);
		var border = border == NaN ? 0 : border;
		
		
		$(div).css("height", (size[1]-border*2) + "px");
		$(div).css("width",  (size[0]-border*2) + "px");
		$(div).css("position", "absolute");
		Entity.Utils.applyTexture(div, texture);
		
		UpdateByObj(div, transform_origin, "0% 0%");
		UpdateByObj(div, transform, translate3d(new Vector3(pos)) + rotate3d(new Vector3(rot)));
		
		return div;
	}
});
