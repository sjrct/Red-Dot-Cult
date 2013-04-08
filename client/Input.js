namespace("Input", function()
{
	var pause_menu;
	var mouse_interval;

	Input.enable_mouse = function() {
		var oldx=0, oldy=0, first_mm = true;
		var curx = 0;
		var cury = 0;
		
		$(document).on('mousemove.GameInput', function(e) {
			if (Hud.MenuShown()) return;

			if (first_mm) {
				first_mm = false;
			} else {
				var xoff=4.5;
				var yoff=4.5;
				
				cury += (oldx - e.pageX)/yoff;
				curx += (oldy - e.pageY)/xoff;
			}
			if(e.pageX +1 == $("#camera").width()) {
				console.log(e.pageX);
				cury-=2;
			}
			if(e.pageX == 0) {
				console.log(e.pageX);
				cury+=2;
			}
			oldx = e.pageX;
			oldy = e.pageY;
			if(Utils.IsDefined(game.camera)) {
				game.camera.rot = new Vector3(180 + curx, cury, 0);
			}
		});
		
		mouse_interval = window.setInterval(function()
		{
			Socket.Send(Server.MousePos, {x : curx.toFixed(2), y: cury.toFixed(2)});
		}, 80);
		
	
		$(document).on('click.GameInput', function(e)
		{
			if (Hud.MenuShown()) return;
			Socket.Send(Server.Fire, "");
		});
	}
	
	Input.disable_mouse = function() {
		$(document).off('mousemove.GameInput');
		$(document).off('click.GameInput');
		window.clearInterval(mouse_interval);
	}
	
	Input.enable_keyboard = function() {
		var mleft = false, mright = false;
		var mforward = false, mbackward = false;
		
		$(document).on('keydown.GameInput', function(e)
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
					if(!mforward) {
						key='forward';
						mforward = true;
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
						key='backward';
						mbackward = true;
					}
					break;
				case Number(Settings.control_reload):
					key='reload';
					break;
			
				case Number(Settings.control_menu):			
					if(Utils.IsDefined(pause_menu)) {
						pause_menu.Open();
					}
					break;
			};
			
			if(Utils.IsDefined(key)) {
				Socket.Send(Server.KeyDown, key);
			}
		});

		$(document).on('keyup.GameInput', function(e)
		{
			var key;

			switch(e.keyCode) {
				case Number(Settings.control_left):
					key='left';
					mleft = false;
					break;
				case Number(Settings.control_up):
					key='forward';
					mforward = false;
					break;
				case Number(Settings.control_right):
					key='right';
					mright = false;
					break;
				case Number(Settings.control_down):
					key='backward';
					mbackward = false;
					break;
			};
			
			if(Utils.IsDefined(key)) {
				Socket.Send(Server.KeyUp, key);
			}
		});
	}
	
	Input.disable_keyboard = function() {
		$(document).off('keydown.GameInput');
		$(document).off('keyup.GameInput');
	}
	
	Input.set_pause_menu = function(pm) {
		if (Utils.IsDefined(pause_menu)) {
			pause_menu.Close();
		}
		
		pause_menu = pm;
	}
});
