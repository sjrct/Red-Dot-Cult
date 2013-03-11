namespace('Entity', function() 
{
	Entity.Load = function(parent, type, resource) {
		if(!Utils.IsDefined(modelRoot)) {
			modelRoot = document.createElement('div');
			document.body.appendChild(modelRoot);
			$(modelRoot).css('visibility', 'hidden');
		}
	
		if(!Utils.IsDefined(Models[resource])) {
			switch(type) {
				case Entity.ModelType.TriModel:
					Models[resource] = new Entity.TriModel(modelRoot, resource);
					break;
				case Entity.ModelType.RectModel:
					Models[resource] = new Entity.RectModel(modelRoot, resource);
					break;
				default:
					return "Invalid Type";
			}
		}
		
		this.Model = Models[resource].Duplicate(parent);
	}
	
	Entity.Load.prototype = {
		Translate3d : function(v) {
			UpdateByObj(this.Model, transform, translate3d(v));
		}
	}

	Entity.ModelType = {
		TriModel : 0,
		RectModel : 1,
	};

	var Models = {};
	
	var modelRoot = undefined;
});
