//
// main.js
//

var Console;
var game;

$(document).ready(function() {
	Console = new Hud.Area();
	Console.Append("Connecting...");

	Hud.init();
	
	Socket.Connect(connect);
});

//TODO move server stuff somewhere else

var Server = {
	GetId : 0,
	JoinGame : 1,
	SetName : 2,
	SendPos : 3,		//multi
	EventChanel : 4,	//multi
	KeyUp : 100,
	KeyDown : 101,
	Fire : 102,
	MousePos : 103,
	DisableMovement : 200,
	EnableMovement : 201,
}

function connect(connected) {
	if(connected) {
		Console.Append("Connected to Centeral server");
		game = new Game('testlvl');
	} else {
		Console.Append("Failed to connect to server");
	}
}
