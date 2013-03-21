//
// main.js
//

var Console;
var Game;

$(document).ready(function() {
	
	Console = new Hud.Area();
	
	Console.Append("Connecting...");
	
	Socket.Connect(connect);
});

//TODO move server stuff somewhere else

var Server = {
	GetArena : 0,
	ChooseArena : 1,
	StateBack : 2,
	KeyDown: 100,
	KeyUp: 101,
	Fire : 102,
	MousePos : 103,
}

function StartGame(lvlname) {
	Game = new Game(lvlname);
}

function chooseArena(arena) {
	Console.Append("Chose " + arena);
	Socket.Transaction(Server.ChooseArena + ":" + arena, StartGame);
}

function ArenaMenu(list) {
	Console.Append("Retreived list of active arenas");
	var menu = new Hud.Menu('Select a Arena');
	var arenas = list.split(";");
	arenas.forEach(function(arena){
		menu.AddButton(new Hud.Menu.Button({text: arena, click: chooseArena }));
	});
	menu.Show();
}

function connect(connected) {
	if(connected) {
		Console.Append("Connected to centeral server");
		Console.Append("Retreiving list of active arenas");
		Socket.Transaction(Server.GetArena, ArenaMenu);
	} else {
		Console.Append("Failed to connect to server");
	}
}


