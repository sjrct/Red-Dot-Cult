var camera;

function UpdateCamera(data) {
	data = eval(data);
	camera.rot = new Vector3(180 + data[0][0], data[0][1], 0);
	camera.pos = new Vector3(data[1]);
}

function control_button(pretty, key, menu)
{
	return menu.Add(
		pretty + " (" + Settings[key] + ")",
		function (btn) {
			var old = $._data(document, "events").keydown[0]; // not the best solution
			$(document).off('keydown');
			btn.SetText("[press a key]");
						
			$(document).keydown(function (e) {
				Settings.set(key, e.keyCode);
				btn.SetText(pretty + " (" + e.keyCode + ")");
				$(document).off('keydown');
				$(document).keydown(old);
			});
		}
	);
}

Game = function(level_name) {
	Socket.TransactionMany(Server.StateBack, UpdateCamera);  //Start the camera position receive
	
	camera = new Camera($("#camera"));
	
	var level = new Level(camera.div, level_name);
	var mouse = new Input.Mouse();
	var keyboard = new Input.Keyboard();

	var pauseMenu = new Hud.Menu('Paused');
	var optionsMenu = new Hud.Menu('Options');
	var controlsMenu = new Hud.Menu('Controls');

	controlsMenu.Add( 'Back', function(btn) { optionsMenu.Open(); controlsMenu.Close(); } );
	control_button('Move Foward',   'control_up',     controlsMenu);
	control_button('Move Backward', 'control_down',   controlsMenu);
	control_button('Move Left',     'control_left',   controlsMenu);
	control_button('Move Right',    'control_right',  controlsMenu);
	control_button('Reload',        'control_reload', controlsMenu);

	optionsMenu.Add('Back', function(btn) { pauseMenu.Open(); optionsMenu.Close(); } );
	optionsMenu.Add('Controls', function() { controlsMenu.Open(); optionsMenu.Close(); } );
	
	pauseMenu.Add('Options', function(btn) { optionsMenu.Open(); pauseMenu.Close(); } );
	pauseMenu.Add('Resume',function(btn){ pauseMenu.Close() } );
	
	keyboard.SetMenu(pauseMenu);
		
//	var local_plyr = new Player("You");
//	local_plyr.add_weapon(new Weapon("L4z0R", 10, 5, 15));
}
