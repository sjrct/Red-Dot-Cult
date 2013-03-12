namespace('Entity', function () {
	function create_rectangle(pos, rot, width, height, texture) {
		var div = document.createElement('div');
	
		$(div).css("height", width + "px");
		$(div).css("width",  height + "px");
		$(div).css("position", "absolute");
		Entity.Utils.applyTexture(div, texture);
//		applyTexture(texture)
	
		UpdateByObj(div, transform_origin, "0% 0%");
		UpdateByObj(div, transform, translate3d(pos) + rotate3d(rot));
	
		return div;
	}

	Entity.RectModel = function(parent, model) {
		this.div = document.createElement("div");
		parent.appendChild(this.div);
		this.model = model;
		this.queue = [];
		this.loaded = false;
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
			var this_ = this;
			loadScript(path, function() {
				var start = new Date().getTime();
				var true_model = eval(model);
				for(var i = 0; i < true_model.length; i++) {
					div.appendChild(create_rectangle(true_model[i][0], true_model[i][1],true_model[i][2],true_model[i][3],true_model[i][4]));
				}
				console.log(model + ".js loaded in " + (new Date().getTime() - start)/1000 + "s");
				this_.CloneQueue();
			});	
		},
		
		Duplicate : function(parent) {
			var div = document.createElement('div');
			
			parent.appendChild(div);
						
			UpdateByObj(div, transform_style, "preserve-3d");
			$(div).css("position", "relative");
			$(div).css("margin", "0 auto");
			
			if(this.loaded) {
				this.Clone(div);
			} else {
				this.queue.push(div);
			}
			return div;
		},
		
		Clone : function(parent) {	
			$(parent).append($(this.div).clone());
		},
		
		CloneQueue : function() {
			this.loaded = true;
			for(var i = 0; i < this.queue.length; i++) {
				this.Clone(this.queue[i]);
			}
		},
	};
});
