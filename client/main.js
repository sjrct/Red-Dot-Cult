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
	StateBack : 0,
	KeyDown: 100,
	KeyUp: 101,
	Fire : 102,
	MousePos : 103,
	DisableMovement : 200,
	EnableMovement : 201,
}

function connect(connected) {
	if(connected) {
		Console.Append("Connected to centeral server");
		Game = new Game('testlvl');
	} else {
		Console.Append("Failed to connect to server");
	}
}


