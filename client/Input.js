namespace("Input", function() {
	var Controls = {
		left:   65,	// left arrow
		up:     87,	// up arrow
		right:  68,	// right arrow
		down:   83,	// down arrow
		reload: 17,	// ctrl
		menu:   27,	// escape
	};

	Input.Mouse = function() {
		var oldx=0, oldy=0, first_mm = true;
		var mouse = this;
		mouse.x = 0;
		mouse.y = 0;
		$(document).mousemove(function(e){
			if (Hud.Shown()) return;

			if (first_mm) {
				first_mm = false;
			} else {
				var xoff=3.5;
				var yoff=2.5;
				mouse.y += (oldx - e.pageX)/yoff;
				mouse.x += (oldy - e.pageY)/xoff;
			}
			oldx = e.pageX;
			oldy = e.pageY;
		});
		
		window.setInterval(function()
		{
			Socket.Send(Server.MousePos + ":" + sprintf('%1,%2', mouse.x.toFixed(2), mouse.y.toFixed(2)));
		}, 80);
		
	
		$(document).click(function(e)
		{
			if (Hud.Shown()) return;
			Socket.Send(Server.Fire);
		});
	}
	
	Input.Mouse.prototype = {
		Destroy : function() {
			
		}
	}
	

	Input.Keyboard = function() {
	
		var mleft = false, mright = false;
		var mfoward = false, mbackward = false;
		
		var this_ = this;
		$(document).keydown(function(e)
		{
			if (Hud.Shown() && e.keyCode != Controls.menu) return;
			
			var key;
			switch(e.keyCode) {
				case Controls.left:
					if(!mleft) {
						key='left';
						mleft = true;
					}
					break;
				case Controls.up:
					if(!mfoward) {
						key='up';
						mfoward = true;
					}
					break;
				case Controls.right:
					if(!mright) {
						key='right';
						mright = true;
					}
					break;
				case Controls.down:
					if(!mbackward) {
						key='down';
						mbackward = true;
					}
					break;
				case Controls.reload:
					key='reload';
					break;
			
				case Controls.menu:
					if(Utils.IsDefined(this_.menu)) {
						if(this_.menu.shown) {
							this_.menu.Hide();
						} else {
							this_.menu.Show();
						}
					}
					break;
			};
			if(Utils.IsDefined(key)) {
				Socket.Send(Server.KeyDown + ":" + key);
			}
		});

		$(document).keyup(function(e)
		{
			if (Hud.Shown()) return;
			var key;

			switch(e.keyCode) {
				case Controls.left:
						key='left';
						mleft = false;
						break;
				case Controls.up:
						key='up';
						mfoward = false;
						break;
				case Controls.right:
						key='right';
						mright = false;
						break;
				case Controls.down:
						key='down';
						mbackward = false;
						break;
			};
			
			if(Utils.IsDefined(key)) {
				Socket.Send(Server.KeyUp + ":" + key);
			}
		});
	}
	
	Input.Keyboard.prototype = {
		Destroy : function() {
			
		},
		SetMenu : function(menu) {
			if(Utils.IsDefined(this.menu)) {
				this.menu.Hide();
			}
			this.menu = menu;
		}
	}
});
