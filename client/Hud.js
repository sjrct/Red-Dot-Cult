//
// hud.js
//

namespace('Hud', function()
{
	var menus_open = 0;
	
	Hud.init = function() {
		$(document.body).css('cursor', 'none');
	}
	
	Hud.MenuShown = function () {
		return menus_open > 0;
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
					menus_open--;
					this_.shown = false;
					if (menus_open == 0) {
						Socket.Send(Server.EnableMovement, '');
						$(document.body).css('cursor', 'none');
					}
				}
			},
			
			open: function () {
				if (!this_.open) {
					this_.shown = true;
					$(document.body).css('cursor', 'auto');
					Socket.Send(Server.DisableMovement, '');
					menus_open++;
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
		
		Button : function(text, click) {
			return new Hud.Menu.Button(text, click, this);
		},
		
		Slider : function(label, value, slide) {
			return new Hud.Menu.Slider(label, value, slide, this);
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
	
	Hud.Menu.Slider = function(label, value, slide, menu) {
		this.slider = document.createElement('div');
		this.label = document.createElement('p');
		this.label.className = 'ui-state-default ui-corner-all ui-helper-clearfix';
		this.menu = menu;
		this.value = value;
		$(this.label).css('padding', '4px');
		$(this.label).html(label);
		
		var sldr = this;
		$(this.slider).slider({
			value: value,
			
			change: function(event, ui) {
				sldr.value = ui.value;
				slide(sldr);
			}
		});
		
		$(menu.menu).append(this.label);
		$(menu.menu).append(this.slider);
		$(menu.menu).append('<br>');
	}
	
	Hud.Menu.Slider.prototype = {
		SetLabel : function(label) {
			$(this.label).html(label);
			this.label = label;
		}
	}
	
	Hud.TextEntry = function(title, value, handler) {
		value = Utils.IsDefined(value) ? value : '';
		
		this.menu = new Hud.Menu(title);
		this.field = document.createElement('input');
		
		$(this.field).attr('type', 'text');
		$(this.field).attr('value', value);

		$(this.menu.menu).append(this.field);
		$(this.menu.menu).append('<br>');
		
		var entry = this; 
		var btn = this.menu.Button('Confirm', function(btn) {
			handler( entry, $(entry.field).val() );
		});
		
		$(btn.button).css('float', 'right');
	}

	Hud.Area = function (text) {
		this.div = $(document.createElement('div'));
		this.div.css('color', "#0c0")
		this.div.css('background-color', 'rgba(0,0,0,.5)');
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
			this.text += text + '<br>';
			$(this.div).html(this.text);
		},
		
		Position : function(x,y) {
			this.div.css("left", x);
			this.div.css("top", y);
		}
	}
});
