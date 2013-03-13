namespace("Entity", function() {

	Entity.TriModel = function(parent, model) {
		this.div = new Div(parent);
		this.model = model;

		this.div.SetId(model);
		
		this.queue = [];
		this.loaded = false;
		this.div.css("position", "relative");
		this.div.css("margin", "0 auto");

		var path = "models/" + this.model + ".js";
		console.log("Loading model " + path);
		
		var this_ = this;
		loadScript(path, function() {
			var start = new Date().getTime();
			var true_model = eval(this_.model);
			for(var i = 0; i < true_model.length; i++) {
				this_.div.appendChild(create_triange(true_model[i][0], true_model[i][1],true_model[i][2],true_model[i][3],true_model[i][4],true_model[i][5]));
			}
			console.log(model + ".js loaded in " + (new Date().getTime() - start)/1000 + "s");
			this_.CloneQueue();
		});	
	}

	Entity.TriModel.prototype = {
		Duplicate : function(parent) {
			var div = new Div(parent);
			
			if(this.loaded) {
				this.Clone(div);
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
	}
	
	function create_triange(p1,p2,p3,trans,R1,R2) {
		var div = document.createElement("div");
		var scale = 100;
		var size = 100;
		
		$(div).css("height", size + "px");
		$(div).css("width",  size + "px");
		$(div).css("position", "absolute");
		
		var points = [[p1[0]*scale,p1[1]*scale], [p2[0]*scale,p2[1]*scale], [p3[0]*scale,p3[1]*scale]];
		var style = {'fill': '#555', 'stroke': '#0F0', 'stroke-width': 1};
		
		var svg = new Entity.Svg(div);
		svg.Polygon(points, style);

		//HACK to fix css axis rotate limits
		if(Math.abs(R1[0]) <= 0.000001)
			R1[0] = 0;
		if(Math.abs(R1[1]) <= 0.000001)
			R1[1] = 0;
		if(Math.abs(R1[2]) <= 0.000001)
			R1[2] = 0;

		if(Math.abs(R2[0]) <= 0.000001)
			R2[0] = 0;
		if(Math.abs(R2[1]) <= 0.000001)
			R2[1] = 0;
		if(Math.abs(R2[2]) <= 0.000001)
			R2[2] = 0;

		UpdateByObj(div, transform_origin, "0% 0%");
		UpdateByObj(div, transform,
			translate3d(new Vector3(trans[0]*scale,trans[1]*scale,trans[2]*scale)) + 
			"rotate3d(" + R1[0] + "," + R1[1] + ","+ R1[2] + ","+ -R1[3] + "rad) " +
			"rotate3d(" + R2[0] + "," + R2[1] + ","+ R2[2] + ","+ -R2[3] + "rad) "
		);

		return div;
	}
});
