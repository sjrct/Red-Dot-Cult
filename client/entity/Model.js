ModelType = {
	TriModel : 0;
	RectModel : 1;
};

// Model(ModelType type, string resourceName)
function Model(type, resource) {
	switch(type) {
		case ModelType.TriModel:
			this.model = new TriModel(___, resource);
			break;
		case ModelType.RectModel:
			this.model = new RectModel(___, resource);
			break;
		default:
			return "Invalid Type";
	}
}
