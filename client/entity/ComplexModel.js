namespace("Entity", function () {
	Entity.ComplexModel = function(div, model) {
		div.css("position", "relative");
		div.css("margin", "0 auto");
		
		var animations = [];
		for(var animation in model.animations) {
			animations[animation] = Animation.Create(model.animations[animation]);
		}
		
		var deps = [];
		for(var object in model.objects) {
			var obj = model.objects[object];
			var ent = new Entity.Load(div, obj.model);
			ent.Model.SetId(obj.name);
			Animation.Apply(animations[obj.animation], ent);
			ent.Translate3d(obj.location || new Vector3(0,0,0));
			ent.Rotate3d(obj.rotation || new Vector3(0,0,0));
			ent.Scale3d(obj.scale || new Vector3(1,1,1));
			if(deps.indexOf(obj.model) == -1) {
				deps.push(obj.model);
			}
		}
		
		return deps;
	}
});
