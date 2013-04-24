namespace("Entity", function() {

	Entity.TriModel = function(div, model) {
		div.css("position", "relative");
		div.css("margin", "0 auto");
		
		for(var i = 0; i < model.length; i++) {
			div.appendChild(create_triange(model[i][0], model[i][1], model[i][2], model[i][3], model[i][4], model[i][5]));
		}
		return div;
	}
	
	function create_triange(p1,p2,p3,trans,R1,R2) {
		var scale = 100;
		
		var points = [[p1[0]*scale,p1[1]*scale], [p2[0]*scale,p2[1]*scale], [p3[0]*scale,p3[1]*scale]];
		var style = {'fill': '#404', 'stroke': '#F00', 'stroke-width': 1};
		
		var svg = new Entity.Svg();
		svg.Polygon(points, style);
		
		var height = Math.max(p2[0], p2[1]) * scale + 6;
		var width = Math.max(p3[0], p3[1]) * scale;
		svg.Size(width, height);

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

		UpdateByObj(svg.svg, transform_origin, "0% 0%");
		UpdateByObj(svg.svg, transform,
			translate3d(new Vector3(trans[0]*scale,trans[1]*scale,trans[2]*scale)) + 
			sprintf('rotate3d(%1,%2,%3,%4rad) ', R1[0], R1[1], R1[2], -R1[3]) +
			sprintf('rotate3d(%1,%2,%3,%4rad) ', R2[0], R2[1], R2[2], -R2[3]) +
		"");

		return svg.svg;
	}
});
