/*
	Socket.Connect(function(bool));					//calls function(succeded)
	Socket.Disconnect();
	Socket.Send(data);							//returns transaction handle
	Socket.ReceiveOne(handle, function(data));
	Socket.ReceiveMany(handle, function(data));
*/

namespace("Socket", function() 
{
	var ones = [];
	var mults = [];
	
	var socket;
	var host = "ws://localhost:8888/ws";  
	var socket = undefined;
	
	function message(foo) {
		console.log(foo);
	}
	
	function receive(data){
		var str = data.data;
		var id = parseInt(str.split(':', 1));
		var message = str.replace(id + ":", '');
		
		if(id != NaN) {
			if(Utils.IsDefined(mults[id])) {
				mults[id](message);
			} else if (Utils.IsDefined(ones[id])) {
				ones[id](message);
			} else {
				alert("Invalid transaction id: " + id);
			}
			
		} else {
			alert("Error in transaction, " + str);
		}
	}
	
	Socket.Connect = function(func) {
		socket = new WebSocket(host);
		
		socket.onmessage = receive;
		
		socket.onopen = function(){
			socket.onclose = undefined;
			func(true);
		}
		
		socket.onclose = function(){
			func(false);
		}
	}
	
	Socket.Disconnect = function() {
		ones = [];
		mults = [];
		socket.close();
	}
	
	var handle = 0;
	Socket.Send = function(data) {
		handle++;
		socket.send(handle  + ":" + data);
		return handle;
	}
	
	Socket.ReceiveOne = function (handle, func) {
		ones[handle] = func;
	}
	
	Socket.ReceiveMany = function (handle, func) {
		mults[handle] = func;
	}
	
	Socket.Transaction = function (data, func) {
		Socket.ReceiveOne(Socket.Send(data), func);
	}
});
