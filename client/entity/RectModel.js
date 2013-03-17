namespace('Entity', function () {
	
	Entity.RectModel = function(div, model) {
		div.css("position", "relative");
		div.css("margin", "0 auto");
		
		for(var i = 0; i < model.length; i++) {
			div.appendChild(create_rectangle(model[i][0], model[i][1], model[i][2], model[i][3], model[i][4]));
		}
		return div;
	}
	
	function create_rectangle(pos, rot, width, height, texture) {
		var div = document.createElement('div');
	
		$(div).css("height", width + "px");
		$(div).css("width",  height + "px");
		$(div).css("position", "absolute");
		Entity.Utils.applyTexture(div, texture);
		
		UpdateByObj(div, transform_origin, "0% 0%");
		UpdateByObj(div, transform, translate3d(new Vector3(pos)) + rotate3d(new Vector3(rot)));
		
		return div;
	}


	Entity.RectModel.prototype = {
		Clone : function(parent) {
			this.div.Clone(parent);
		}
	};
});
