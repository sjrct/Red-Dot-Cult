namespace("Entity", function() {
	Entity.Svg = function (parent) {
		this.svg = document.createElement("svg");
		$(this.svg).appendTo(parent);
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
		}
	}
	function svgElement(tag)
	{
	   return document.createElementNS('http://www.w3.org/2000/svg', tag);
	}
});
