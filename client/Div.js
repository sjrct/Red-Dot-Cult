Div = function(parent) {
	this.parent = parent;
	this.div = document.createElement('div');
	if(Utils.IsDefined(parent)) {
		parent.appendChild(this.div);
	}
	
	this.position = new Vector3(0,0,0);
	this.rotation = new Vector3(0,0,0);
	
	UpdateByObj(this.div, transform_style, "preserve-3d");
	UpdateByObj(this.div, transform_origin, "0% 0%");
	
	this.css("position", "relative");
	this.css("margin", "0 auto");
	
	this.transform = "";
	this.animationRunning = false;
}

Div.prototype = {
	Rotate : function(v) {
		this.rotation.add(v);
		this.UpdateTransform();
	},
	SetRotate : function(v) {
		this.rotation = v;
		this.UpdateTransform();
	},
	Translate : function(v) {
		this.position.add(v);
		this.UpdateTransform();
	},
	SetTranslate : function(v) {
		this.position = v;
		this.UpdateTransform();
	},
	css : function(item, val) {
		$(this.div).css(item, val);
	},
	CustomTransform : function(t) {
		this.transform = t;
		this.UpdateTransform();
	},
	UpdateTransform : function() {
		UpdateByObj(this.div, transform, this.transform + " " + translate3d(this.position) + rotate3d(this.rotation));
	},
	SetId : function(id) {
		$(this.div).attr('id', id);
	},
	appendChild : function(child) {
		if(Utils.IsDefined(child.div)) {
			this.div.appendChild(child.div);
		} else {
			this.div.appendChild(child);
		}
	},
	Clone : function(parent) {
		if(Utils.IsDefined(parent.div)) {
			$(parent.div).html($(this.div).html());
		} else {
			$(parent).html($(this.div).html());
		}
	},
	ApplyAnimation : function(id, duration, count) {
		UpdateByObj(this.div, animation, sprintf(' %1 %2s linear %3', id, duration, count));
		UpdateByObj(this.div, animation_play_state, 'running');
		this.animationRunning = true;
	},
	ToggleAnimation : function() {
		if (this.animationRunning) {
			UpdateByObj(this.div, animation_play_state, 'paused');
			console.log('pause');
		} else {
			UpdateByObj(this.div, animation_play_state, 'running');
			console.log('play');
		}
		this.animationRunning = !this.animationRunning;
	},
	ClearAnimation : function() {
		UpdateByObj(this.div, animation, '');
		UpdateByObj(this.div, animation_play_state, '');
		this.animationRunning = false;
	},
	html : function () {
		$(this.div).html(arguments);
	}
}
