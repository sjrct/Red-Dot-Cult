//
// utils.js
//

// Maybe these should be put in a namespace...
var transform           = 0;
var transform_style     = 1;
var backface_visibility = 2;
var transition_duration = 3;
var transform_origin    = 4;

var _prop_strs = [
	'Transform',
	'TransformStyle',
	'BackfaceVisibility',
	'TransitionDuration',
	'TransformOrigin'
];

function _init_utils()
{
	var prefixs = ['Webkit', 'Moz', 'O', 'ms'];
	var el = document.createElement('div');
	
	for(var i = 0, li = _prop_strs.length; i < li; i++)
	{
		for(var j = 0, lj = prefixs.length; j < lj; j++)
		{
			str = prefixs[j] + _prop_strs[i];
			if(typeof el.style[str] !== "undefined") {
			    _prop_strs[i] = str;
			    break;
			}
		}

	}
	
}
_init_utils();

function UpdateByObj(obj, prop, value) {
	obj.style[_prop_strs[prop]] = value;
}

function translate3d(v) {
	return v.isZero() ? "" : "translate3d("+v.x+"px, "+v.y+"px, "+v.z+"px) ";
}

function ptranslate3d(x,y,z) {
	return "translate3d("+x+"px, "+y+"px, "+z+"px) ";
}

function rotate3d(v) {
	return  v.isZero() ? "" : "rotateX("+v.x+"deg) rotateY("+v.y+"deg) rotateZ("+v.z+"deg) ";
}

function scale3d(v) {
	return "scale3d("+v.x+","+v.y+","+v.z+")";
}

function skew3d(v) {
	return "skewX("+v.x+"deg) skewY("+v.y+"deg) skewZ("+v.z+"deg) ";
}


