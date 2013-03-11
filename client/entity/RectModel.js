namespace('Entity', function () {
	function create_rectangle(pos, rot, width, height, texture) {
		var div = document.createElement('div');
	
		$(div).css("height", width + "px");
		$(div).css("width",  height + "px");
		$(div).css("position", "absolute");
		applyTexture(texture)
	
		UpdateByObj(div, transform_origin, "0% 0%");
		UpdateByObj(div, transform, translate3d(pos) + rotate3d(rot));
	
		return div;
	}

	Entity.RectModel = function(parent, model) {
		this.div = document.createElement(div);
		parent.appendChild(div);
		this.model = model;
		this.Load();
	}

	Entity.RectModel.prototype = {
		Load : function() {
			UpdateByObj(this.div, transform_style, "preserve-3d");
			$(this.div).css("position", "relative");
			$(this.div).css("margin", "0 auto");

			var path = "models/" + this.model + ".js";

			console.log("Loading model " + path);
			var model = this.model;
			var div = this.div;
			loadScript(path, function() {
				var start = new Date().getTime();
				var true_model = eval(model);
				for(var i = 0; i < true_model.length; i++) {
					div.appendChild(create_rectangle(true_model[i][0], true_model[i][1],true_model[i][2],true_model[i][3],true_model[i][4]));
				}
				console.log(model + ".js loaded in " + (new Date().getTime() - start)/1000 + "s");
			});	
		}
	};
});
