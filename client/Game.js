var camera;

function UpdateCamera(data) {
	data = eval(data);
	camera.rot = new Vector3(180 + data[0][0], data[0][1], 0);
	camera.pos = new Vector3(data[1]);
}

Game = function(level_name) {
	Socket.TransactionMany(Server.StateBack, UpdateCamera);  //Start the camera position receive
	
	camera = new Camera($("#camera"));
	
	var level = new Level(camera.div, level_name);
	var mouse = new Input.Mouse();
	var keyboard = new Input.Keyboard();
	
	var menu = new Hud.Menu('Paused');
	menu.AddButton(new Hud.Menu.Button({text: 'databar', click: menu.Close }));
	
	keyboard.SetMenu(menu)
	
//	var local_plyr = new Player("You");
//	local_plyr.add_weapon(new Weapon("L4z0R", 10, 5, 15));
}
