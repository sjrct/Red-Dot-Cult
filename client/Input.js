namespace("Input", function() {
	Input.Mouse = function() {
		var oldx=0, oldy=0, first_mm = true;
		var mouse = this;
		mouse.x = 0;
		mouse.y = 0;
		$(document).mousemove(function(e){
			if (Hud.MenuShown()) return;

			if (first_mm) {
				first_mm = false;
			} else {
				var xoff=4.5;
				var yoff=4.5;
				mouse.y += (oldx - e.pageX)/yoff;
				mouse.x += (oldy - e.pageY)/xoff;
			}
			if(e.pageX +1 == $("#camera").width()) {
				console.log(e.pageX);
				mouse.y-=2;
			}
			if(e.pageX == 0) {
				console.log(e.pageX);
				mouse.y+=2;
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
			if (Hud.MenuShown()) return;
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
			if (Hud.MenuShown()) {
				if (e.keyCode == Number(Settings.control_menu)) {
					Hud.current_menu.Close();
				}
				return;
			}
			
			var key;
			switch(e.keyCode) {
				case Number(Settings.control_left):
					if(!mleft) {
						key='left';
						mleft = true;
					}
					break;
				case Number(Settings.control_up):
					if(!mfoward) {
						key='up';
						mfoward = true;
					}
					break;
				case Number(Settings.control_right):
					if(!mright) {
						key='right';
						mright = true;
					}
					break;
				case Number(Settings.control_down):
					if(!mbackward) {
						key='down';
						mbackward = true;
					}
					break;
				case Number(Settings.control_reload):
					key='reload';
					break;
			
				case Number(Settings.control_menu):
					if(Utils.IsDefined(this_.menu)) {
						this_.menu.Open();
					}
					break;
			};
			if(Utils.IsDefined(key)) {
				Socket.Send(Server.KeyDown + ":" + key);
			}
		});

		$(document).keyup(function(e)
		{
			if (Hud.MenuShown()) return;
			var key;

			switch(e.keyCode) {
				case Number(Settings.control_left):
						key='left';
						mleft = false;
						break;
				case Number(Settings.control_up):
						key='up';
						mfoward = false;
						break;
				case Number(Settings.control_right):
						key='right';
						mright = false;
						break;
				case Number(Settings.control_down):
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
