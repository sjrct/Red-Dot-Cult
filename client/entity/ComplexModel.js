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
			ent.Translate3d(obj.location);
			ent.Rotate3d(obj.rotation);
			Animation.Apply(animations[obj.animation], ent);
			deps.push(obj.model);
		}
		
		return deps;
	}
});
