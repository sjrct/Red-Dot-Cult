//
// Level.js
//

function Level(par, level)
{
	this.level = level;
	this.weapons = [];
	this.entities = [];
	
	var path = "levels/" + level + ".js";
	var this_ = this;
	
	loadScript(path, function() {
		var lvl = window[level];
		
		for (var i = 0; i < lvl.entities.length; i++) {
			var ent = lvl.entities[i];
			var x = new Entity.Load(par, ent.model);
			x.Translate3d(ent.location);
			x.Rotate3d(ent.rotation);
			this_.entities.push(x);
		}
	});
}
