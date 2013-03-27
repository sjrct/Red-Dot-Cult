//
// hud.js
//

$(document.body).css('cursor', 'none');

namespace('Hud', function()
{
	var menu_shown = false;
	
	Hud.MenuShown = function () {
		return menu_shown;
	}
		
	Hud.Menu = function (title) {
		this.menu = document.createElement('div');
		this.menu.title = title;
		this.shown = false;

		var this_ = this;
		$(this.menu).dialog({
			modal: true,
			closeOnEscape: false,
			autoOpen: false,
			
			close: function () {
				if (this_.shown) {
					$(document.body).css('cursor', 'none');
					this_.shown = false;
					menu_shown = false;
				}
			},
			
			open: function () {
				if (!menu_shown) {
					$(document.body).css('cursor', 'auto');
					this_.shown = true;
					menu_shown = true;
					Hud.current_menu = this_;
				}
			}
		});
	}
	
	Hud.Menu.prototype = {
		Open : function() {
			$(this.menu).dialog('open');
		},
		
		Close : function() {
			$(this.menu).dialog('close');
		},
		
		Add : function(text, click) {
			return new Hud.Menu.Button(text, click, this);
		}
	}

	Hud.Menu.Button = function(text, click, menu) {
		this.button = document.createElement('input');
		$(this.button).attr('type', 'button');
		$(this.button).attr('value', text);
		this.text = text;
		this.menu = menu;
		
		var btn = this;
		$(this.button).button().click(function(event) {
			click(btn);
		});
		
		$(menu.menu).append(this.button);
		$(menu.menu).append('<br>');
	}
	
	Hud.Menu.Button.prototype = {
		SetText : function(text) {
			$(this.button).attr('value', text);
			this.text = text;
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
