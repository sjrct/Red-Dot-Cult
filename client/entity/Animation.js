/*
	Animation.Create(string rules) : handle;
	Animation.Apply(Animation_ID, Entity);
	Animation.Clear(Entity);
*/

namespace("Animation", function() {

	var style = document.createElement('style');
	style.type = 'text/css';
	document.head.appendChild(style);
	
	var index = '0';
	
	//TODO cross browser compatibility
	Animation.Create = function(rules) {
		index ++;
		var name = 'anim' + index;
		var str = '\n';
		for(key in rules) {
			str += key + ' { ';
			for(sty in rules[key]) {
				str += PropertyString(sty) + ': ' + rules[key][sty] + "; ";
			}
			str += '} \n';
		}
		str = "@-webkit-keyframes " + name + " { " + str + " }";
		console.log(str);
		var anim = document.createTextNode(str);
		$(style).append(anim);
		console.log(style);
		
		return name;
	}
	
	Animation.Apply = function(id, ent) {
		ent.Model.ApplyAnimation(id, 4, 'infinite');
	}
	
	Animation.Clear = function(ent) {
		end.Model.ClearAnimation();
	}
});
