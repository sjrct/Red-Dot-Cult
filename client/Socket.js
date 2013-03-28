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
	
	function receive(data){
		data = JSON.parse(data.data);
		id = data.id;
		message = data.message;
		
		if(id != NaN) {
			if(Utils.IsDefined(mults[id])) {
				mults[id](message);
			} else if (Utils.IsDefined(ones[id])) {
				ones[id](message);
				ones.splice(id, 1);
			} else {
				console.log(data);
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
	Socket.Send = function(func, data) {
		handle++;
		socket.send(JSON.stringify({id: handle, func: func, message: data}));
		return handle;
	}
	
	Socket.ReceiveOne = function (handle, func) {
		ones[handle] = func;
	}
	
	Socket.ReceiveMany = function (handle, func) {
		mults[handle] = func;
	}
	
	Socket.Transaction = function (func, data, callback) {
		Socket.ReceiveOne(Socket.Send(func, data), callback);
	}
	
	Socket.TransactionMany = function (func, data, callback) {
		Socket.ReceiveMany(Socket.Send(func, data), callback);
	}
});
