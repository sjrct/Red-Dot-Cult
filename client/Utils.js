namespace("Utils", function() {
	Utils.IsDefined = function(item) {
		return typeof item !== 'undefined';
	}
});

function sprintf(str) {
	for(var i = 1; i < arguments.length; i++) {
		str = str.replace('%' + i, arguments[i]);
	}
	return str;
}
