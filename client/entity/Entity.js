namespace('Entity', function() {
	Entity.Load = function(parent, type, resource) {
		switch(type) {
			case Entity.ModelType.TriModel:
				this.model = new Entity.TriModel(parent, resource);
				break;
			case Entity.ModelType.RectModel:
				this.model = new Entity.RectModel(parent, resource);
				break;
			default:
				return "Invalid Type";
		}
	}

	Entity.ModelType = {
		TriModel : 0,
		RectModel : 1,
	};
});
