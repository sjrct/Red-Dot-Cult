namespace('Entity', function() 
{
	function CheckModelRoot() {
		if(!Utils.IsDefined(modelRoot)) {
			modelRoot = document.createElement('div'); //TODO remove
		}
	}
	
	var queue = [];
	var deps = [];//deps[resource] = ['dep1', 'dep2']
	var dep_div = [];
	var loaded = [];
	
	function LoadModel(resource) {
		CheckModelRoot();
		
		loaded[resource] = false;
		
		var path = sprintf('models/%1.js', resource);
		var div = new Div(modelRoot);
		
		loadScript(path, function() {
			CheckModelRoot();
			
			// Load the model
			var true_model = window[resource];
			switch(true_model.type) {
				case Entity.ModelType.TriModel:
					Entity.TriModel(div, true_model);
					break;
				case Entity.ModelType.RectModel:
					Entity.RectModel(div, true_model);
					break;
				case Entity.ModelType.ComplexModel:
					deps[resource] = Entity.ComplexModel(div, true_model, deps);
					dep_div[resource] = div;
					//clear already loaded models from deps
					for(var res in deps[resource]) {
						if(loaded[deps[resource][res]]) {
							deps[resource].splice(res, 1);
						}
					}
					break;
			}
			
			if(!Utils.IsDefined(deps[resource]) || deps[resource].length == 0) {
				// Done loading, set model and apply to queue
				Models[resource] = div;
				for(var i = 0; i < queue[resource].length; i++) {
					Models[resource].Clone(queue[resource][i]);
				}
				
			}
			
			//Check if I am a dependency
			for(var res in deps) {
				while(deps[res].indexOf(resource) != -1) { // we are a dep of i
					deps[res].splice(deps[res].indexOf(resource), 1);
					if(deps[res].length == 0) { //we were the last dependency, time to init queue[res]
						Models[res] = dep_div[res];
						for(var i = 0; i < queue[res].length; i++) {
							Models[res].Clone(queue[res][i]);
						}
					}
				}
			}
			loaded[resource] = true;
		});	
	}
	
	Entity.Load = function(parent, resource) {
		this.Model = new Div(parent);
		this.ModelAnim = new Div(this.Model);
		
		if(!Utils.IsDefined(Models[resource])) {
			Models[resource] = 'Loading';
			queue[resource] = [];
			LoadModel(resource);
		}
		
		if(Models[resource] == 'Loading') {
			queue[resource].push(this.ModelAnim);
		} else {
			Models[resource].Clone(this.ModelAnim);
		}
	}
	
	Entity.Load.prototype = {
		Translate3d : function(v) {
			this.Model.SetTranslate(v);
		},
		Rotate3d : function(v) {
			this.Model.SetRotate(v);
		},
		ApplyAnimation : function(anim) {
			Animation.Apply(anim, this.ModelAnim);
		}
	}

	Entity.ModelType = {
		TriModel : 0,
		RectModel : 1,
		ComplexModel : 2,
	};

	var Models = {};
	
	var modelRoot = undefined;
});
