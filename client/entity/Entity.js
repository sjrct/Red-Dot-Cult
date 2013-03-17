namespace('Entity', function() 
{
	function CheckModelRoot() {
		if(!Utils.IsDefined(modelRoot)) {
			modelRoot = document.createElement('div');
			document.body.appendChild(modelRoot);
			$(modelRoot).css('visibility', 'hidden');
		}
	}
	
	var queue = [];
	
	function LoadModel(resource) {
		CheckModelRoot();
		
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
			}
			
			// Done loading, set model and apply to queue
			Models[resource] = div;
			for(var i = 0; i < queue[resource].length; i++) {
				Models[resource].Clone(queue[resource][i]);
			}
		});	
	}
	
	Entity.Load = function(parent, resource) {
		this.Model = new Div(parent);
		
		if(!Utils.IsDefined(Models[resource])) {
			Models[resource] = 'Loading';
			queue[resource] = [];
			LoadModel(resource);
		}
		
		if(Models[resource] == 'Loading') {
			queue[resource].push(this.Model);
		} else {
			Models[resource].Clone(this.Model);
		}
	}
	
	Entity.Load.prototype = {
		Translate3d : function(v) {
			this.Model.SetTranslate(v);
		},
		Rotate3d : function(v) {
			this.Model.SetRotate(v);
		}
	}

	Entity.ModelType = {
		TriModel : 0,
		RectModel : 1,
	};

	var Models = {};
	
	var modelRoot = undefined;
});
