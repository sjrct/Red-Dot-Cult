var camera;

function UpdateCamera(data) {
	camera.pos = new Vector3(data.x, data.y, data.z);
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
	Socket.TransactionMany(Server.StateBack, "", UpdateCamera);  //Start the camera position receive
	
	camera = new Camera($("#camera"));
	
	var level = new Level(camera.div, level_name);
	var mouse = new Input.Mouse();
	var keyboard = new Input.Keyboard();

	mouse.SetCamera(camera);

	var pauseMenu = new Hud.Menu('Paused');
	var optionsMenu = new Hud.Menu('Options');
	var controlsMenu = new Hud.Menu('Controls');

	// controls menu
	var ctrlbtns = [];
	var ctrls = [
		['Move Foward',   'control_up'    ],
		['Move Backward', 'control_down'  ],
		['Move Left',     'control_left'  ],
		['Move Right',    'control_right' ],
		['Reload',        'control_reload']
	];
	
	for (var i = 0; i < ctrls.length; i++) {
		ctrlbtns.push(control_button(ctrls[i][0], ctrls[i][1], controlsMenu));
	}
	
	controlsMenu.Add( 'Restore Defaults', function () {
		Settings.set_defaults();
		for (var i = 0; i < ctrlbtns.length; i++) {
			ctrlbtns[i].SetText(ctrls[i][0] + " (" + Settings[ctrls[i][1]] + ")");
		}
	});
	
	controlsMenu.Add( 'Back', function(btn) { optionsMenu.Open(); controlsMenu.Close(); } );

	// options menu
	optionsMenu.Add('Controls', function() { controlsMenu.Open(); optionsMenu.Close(); } );
	optionsMenu.Add('Back', function(btn) { pauseMenu.Open(); optionsMenu.Close(); } );
	
	// Pause Menu
	pauseMenu.Add('Options', function(btn) { optionsMenu.Open(); pauseMenu.Close(); } );
	pauseMenu.Add('Resume',function(btn){ pauseMenu.Close() } );
	
	keyboard.SetMenu(pauseMenu);
		
//	var local_plyr = new Player("You");
//	local_plyr.add_weapon(new Weapon("L4z0R", 10, 5, 15));
}
