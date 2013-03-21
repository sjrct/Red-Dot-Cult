//
// hud.js
//

$(document.body).css('cursor', 'none');

namespace('Hud', function()
{
	var menu_shown;
	
	Hud.Shown = function () {
		return menu_shown;
	}
	
	Hud.Menu = function (title, buttons) {
		this.menu = $("<div title='foobar'></div");//$(document.createElement('div'));
		
		this.menu.attr('title', title);
		
		this.buttons = [];
		
		this.AddButtons(buttons);
		
		this.shown = false;
	}
	
	Hud.Menu.prototype = {
		AddButton : function(button, position) {
			position = Utils.IsDefined(position) || this.buttons.length;
			button.menu = this;
			this.buttons.splice(position, 0, button);
			this.Update();
		},
		AddButtons : function(buttons, position) { //TODO test negatives
			position = Utils.IsDefined(position) || this.buttons.length;
			this.buttons.join(this.buttons.slice(0, position), buttons, this.buttons.slice(position));
			this.Update();
		},
		RemoveButton : function(button) {
			var index = this.buttons.indexOf(button);
			if(index != -1) {
				this.buttons.splice(index, 1);
				this.Update();
			}
		},
		Show : function() {
			this.menu.dialog({modal:true});
			menu_shown = true;
			this.shown = true;
			$(document.body).css('cursor', 'auto');
		},
		Hide : function() {
			this.menu.dialog('close');
			menu_shown = false;
			this.shown = false;
			$(document.body).css('cursor', 'none');
		},
		Update : function() {
			for(var id in this.buttons) {
				this.menu.append(this.buttons[id].button);
			}
		}
	}
	
	// args = {text: value, visible: value, click: function(button)}
	Hud.Menu.Button = function(args) {
		this.button = $(document.createElement('input'));
		this.button.attr('type', 'button');
		this.button.attr('value', args.text);
		
		if(Utils.IsDefined(args.visibile)) {
			args.visibile ? this.Show() : this.Hide();
		}
		if(Utils.IsDefined(args.enabled)) {
			args.enabled ? this.Enable() : this.Disable();
		}
		
		var btn = this;
		this.button.button().click(function(event) 
		{
			args.click(args.text);
			btn.menu.Hide();
		});
		
		this.menu = undefined; //set when added to menu
	}
	
	Hud.Menu.Button.prototype = {
		Show : function() {
			this.button.css('visibility', 'visible');
		},
		Hide : function() {
			this.button.css('visibility', 'hidden');
		},
		Enable : function() {
			this.button.attr('enabled', true);
		},
		Disable : function() {
			this.button.attr('enabled', false);
		},
		Text : function(text) {
			this.button.html(text);
		}
	}
	
	Hud.Area = function (text) {
		this.div = $(document.createElement('div'));
		this.div.css('color', "#0c0")
		$("#hud").append(this.div);
		this.div.draggable({containment : "parent"});
		this.Text(text || "");
	}
	
	Hud.Area.prototype = {
		Text : function (text) {
			if(Utils.IsDefined(text)) {
				this.text = text;
				$(this.div).html(this.text);
			} else {
				return this.text;
			}
		},
		Append : function(text) {
			this.text += "<br>" + text;
			$(this.div).html(this.text);
		},
		Position : function(x,y) {
			this.div.css("left", x);
			this.div.css("top", y);
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});
