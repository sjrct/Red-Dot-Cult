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

		for (var i = 0; i < lvl.tri_ents.length; i++) {
			var x = new Entity.Load(par, Entity.ModelType.TriModel, lvl.tri_ents[i][0]);
			x.Translate3d(new Vector3(lvl.tri_ents[i][1]));
			this_.entities.push(x);
		}

		for (var i = 0; i < lvl.rect_ents.length; i++) {
			var x = new Entity.Load(par, Entity.ModelType.RectModel, lvl.rect_ents[i][0]);
			x.Translate3d(new Vector3(lvl.rect_ents[i][1]));
			this_.entities.push(x);
		}
	});
}
