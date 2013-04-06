function UpdateCamera(data) {
	game.camera.pos = new Vector3(data.x, data.y, data.z);
}

function control_button(pretty, key, menu)
{
	return menu.Button(
		pretty + " (" + Settings[key] + ")",
		function (btn) {
			Input.disable_keyboard();
			btn.SetText("[press a key]");
						
			$(document).on('keydown.RegisterControl', function (e) {
				Settings.set(key, e.keyCode);
				btn.SetText(pretty + " (" + e.keyCode + ")");

				$(document).off('keydown.RegisterControl');
				Input.enable_keyboard();
			});
		}
	);
}

Game = function(level_name) {
	Socket.TransactionMany(Server.StateBack, "", UpdateCamera);  //Start the camera position receive
	
	this.camera = new Camera($("#camera"));
	this.level = new Level(this.camera.div, level_name);

	Input.enable_keyboard();
	Input.enable_mouse();

	var pauseMenu    = new Hud.Menu('Paused');
	var optionsMenu  = new Hud.Menu('Options');
	var controlsMenu = new Hud.Menu('Controls');
	var audioMenu    = new Hud.Menu('Audio');

	// controls menu
	var ctrlbtns = [];
	var ctrls = [
		['Move Foward',   'control_up'    ],
		['Move Backward', 'control_down'  ],
		['Move Left',     'control_left'  ],
		['Move Right',    'control_right' ],
		['Reload',        'control_reload'],
	];
	
	for (var i = 0; i < ctrls.length; i++) {
		ctrlbtns.push(control_button(ctrls[i][0], ctrls[i][1], controlsMenu));
	}
	
	controlsMenu.Button( 'Restore Defaults', function () {
		Settings.set_defaults();
		for (var i = 0; i < ctrlbtns.length; i++) {
			ctrlbtns[i].SetText(ctrls[i][0] + " (" + Settings[ctrls[i][1]] + ")");
		}
	});
	
	controlsMenu.Button( 'Back', function() { optionsMenu.Open(); controlsMenu.Close(); } );

	// audio menu
	audioMenu.Slider( 'Volume', Settings['volume'],
		function(sldr) {
			Settings.set('volume', sldr.value);
		}
	);
	audioMenu.Button( 'Back', function() { optionsMenu.Open(); audioMenu.Close(); } );

	// options menu
	optionsMenu.Button('Controls', function() { controlsMenu.Open(); optionsMenu.Close(); } );
	optionsMenu.Button('Audio', function() { audioMenu.Open(); optionsMenu.Close(); } );
	optionsMenu.Button('Back', function() { pauseMenu.Open(); optionsMenu.Close(); } );
	
	// Pause Menu
	pauseMenu.Button('Options', function() { optionsMenu.Open(); pauseMenu.Close(); } );
	pauseMenu.Button('Resume',function(){ pauseMenu.Close() } );
	
	Input.set_pause_menu(pauseMenu);
		
//	var local_plyr = new Player("You");
//	local_plyr.add_weapon(new Weapon("L4z0R", 10, 5, 15));
}
