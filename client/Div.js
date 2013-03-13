Div = function(parent) {
	this.parent = parent;
	this.div = document.createElement('div');
	parent.appendChild(this.div);
	
	this.position = new Vector3(0,0,0);
	this.rotation = new Vector3(0,0,0);
	
	UpdateByObj(this.div, transform_style, "preserve-3d");
	UpdateByObj(this.div, transform_origin, "0% 0%");
	
	this.css("position", "relative");
	this.css("margin", "0 auto");
	
	this.transform = "";
}

Div.prototype = {
	Rotate : function(v) {
		this.rotation.add(v);
		UpdateTransform();
	},
	SetRotate : function(v) {
		this.rotation = v;
		UpdateTransform();
	},
	Translate : function(v) {
		this.position.add(v);
		UpdateTransform();
	},
	SetTranslate : function(v) {
		this.position = v;
		UpdateTransform();
	},
	css : function(item, val) {
		$(this.div).css(item, val);
	},
	CustomTransform : function(t) {
		this.transform = t;
		UpdateTransform();
	},
	UpdateTransform : function() {
		UpdateByObj(this.div, transform, this.transform);
	},
	SetId : function(id) {
		$(this.div).attr('id', id);
	},
	appendChild : function(child) {
		if(Utils.IsDefined(child.div)) {
			this.div.appendChild(child.div);
		}else {
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
}
