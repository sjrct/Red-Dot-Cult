//
// utils.js
//

// Maybe these should be put in a namespace...
var transform           = 0;
var transform_style     = 1;
var backface_visibility = 2;
var transition_duration = 3;
var transform_origin    = 4;
var animation			= 5;
var animation_play_state= 6;

var _prop_strs = [
	'transform',
	'transform-style',
	'backface-visibility',
	'transition-duration',
	'transform-origin',
	'animation',
	'animation-play-state',
];

function _init_utils()
{
	var prefixs = ['-webkit-', '-moz-', '-o-', '-ms-'];
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

function PropertyString(prop) {
	//ID
	var ret  =_prop_strs[prop];
	if(Utils.IsDefined(ret)) {
		return ret;
	}
	
	//Name
	ret  =_prop_strs[eval(prop)];
	if(Utils.IsDefined(ret)) {
		return ret;
	}
	
	//Not found
	return prop;
}

function UpdateByObj(obj, prop, value) {
	obj.style[_prop_strs[prop]] = value;
}

function translate3d(v) {
	return ptranslate3d(v.x,v.y,v.z);
}

function ptranslate3d(x,y,z) {
	return sprintf("translate3d(%1px,%2px,%3px) ", x, y, z);
}

function rotate3d(v) {
	return sprintf("rotateX(%1deg) rotateY(%2deg) rotateZ(%3deg) ", v.x, v.y, v.z);
}

function scale3d(v) {
	return sprintf("scale3d(%1px,%2px,%3px) ", v.x, v.y, v.z);
}

function skew3d(v) {
	return sprintf("skewX(%1deg) skewX(%2deg) skewX(%3deg) ", v.x, v.y, v.z);
}
