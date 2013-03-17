namespace('Entity', function () {
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

	Entity.RectModel = function(parent, model) {
		this.div = new Div(parent);
		this.model = model;
		this.queue = [];
		this.loaded = false;
		this.Load();
	}

	Entity.RectModel.prototype = {
		Load : function() {
			var path = sprintf('models/%1.js', this.model);
			var this_ = this;
			
			loadScript(path, function() {
				var true_model = window[this_.model];
				for(var i = 0; i < true_model.length; i++) {
					this_.div.appendChild(create_rectangle(true_model[i][0], true_model[i][1],true_model[i][2],true_model[i][3],true_model[i][4]));
				}
				this_.CloneQueue();
			});	
		},
		
		Duplicate : function(parent) {
			var div = new Div(parent);
			
			if(this.loaded) {
				this.div.Clone(div);
			} else {
				this.queue.push(div);
			}
			return div;
		},
		
		CloneQueue : function() {
			this.loaded = true;
			for(var i = 0; i < this.queue.length; i++) {
				this.div.Clone(this.queue[i]);
			}
		},
	};
});
