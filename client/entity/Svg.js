namespace("Entity", function() {
	Entity.Svg = function (parent) {
		this.svg = document.createElement("svg");
		UpdateByObj(this.svg, transform_style, "preserve-3d");
		UpdateByObj(this.svg, transform_origin, "0% 0%");
	
		$(this.svg).css("position", "absolute");
		$(this.svg).css("margin", "0 auto");
	}
	
	Entity.Svg.prototype = {
		Polygon : function(points, style) {
			var poly = $(svgElement('polygon'));
			for(var i in style) {
				poly.attr(i, style[i]);
			}
			var ps = "";
			for(var i in points) {
				ps += points[i][0] + ',' + points[i][1] + " ";
			}
			poly.attr('points', ps);
			poly.appendTo(this.svg);
		},
		Size : function(width, height) {
			$(this.svg).css("height", width + "px");
			$(this.svg).css("width",  height + "px");
		}
	}
	function svgElement(tag)
	{
	   return document.createElementNS('http://www.w3.org/2000/svg', tag);
	}
});
