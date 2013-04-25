//function UpdateCamera(data) {
//}

function UpdatePlayers(data) {
	for (p in data) {
		if (data[p].Id == game.player_id) {
			game.camera.pos = new Vector3(data[p].Position.x, data[p].Position.y, data[p].Position.z);
		} else {
			if ( !Utils.IsDefined(game.players[data[p].Id]) ) {
				// temporary~!
				game.players[data[p].Id] = new Player('M[r/s/rs] Undefined', game.camera.div);
			}

			game.players[data[p].Id].pos = new Vector3(-data[p].Position.x*4, 700, -data[p].Position.z*4);
			game.players[data[p].Id].entity.Translate3d(game.players[data[p].Id].pos);
		}
	}
}

function HandleEventChanel(data) {
	for (p in data) {
		if (data[p].mes == 'SetHealth') {
			game.health_bar.SetHealth(data[p].health);
		}
		else if (data[p].mes == 'Killed') {
			Console.Append(data[p].by + ' killed ' + data[p].who);
		}
	}
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
	this_ = this;
	Socket.Transaction(Server.GetId, '', function(data) {
		this_.player_id = data;
		
		if (Utils.IsDefined(this_.local_plyr)) {
			this_.local_plyr = data;
		}
	});

	Socket.TransactionMany(Server.SendPos, '', UpdatePlayers);
	Socket.TransactionMany(Server.EventChanel, '', HandleEventChanel);
	
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
	
	// setup players
	if (Settings.player_name.length == 0 || Settings.player_name == 'undefined') {
		var entry = new Hud.TextEntry('Enter a Player Name', '', function(entry, name) {
			Console.Append("Player name is now '" + name + "'");
			Settings.set('player_name', name);
			entry.menu.Close();
			Socket.Send(Server.SetName, name);
		});
		
		entry.menu.Open();
	} else {
		Socket.Send(Server.SetName, Settings.player_name);
	}

	this.local_plyr = new Player(Settings.player_name, this.camera.div);
	this.local_plyr.id = this.player_id;
	this.local_plyr.add_weapon(new Weapon("Mr. Default Gun", 10, 100));
	this.local_plyr.entity.Model.css('visibility', 'hidden');
	this.local_plyr.entity.Model.css('display', 'none');
	
	this.players = {};
	
	// health bar
	this.health_bar = new Hud.HealthBar();
}
