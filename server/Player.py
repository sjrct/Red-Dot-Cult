# Player
import tornado.websocket
from Arena import Arena
import math
import json
from Vec import *

from apscheduler.scheduler import Scheduler
class Keys:
	def __init__(self):
		self.forward = False;
		self.backward = False;
		self.right = False;
		self.left = False;
	
	def setKey(self, string, state):
		setattr(self, string, state)

class Message:
	def __init__(self, string):
		data = json.loads(string)
		self.id = data['id']
		self.func = data['func']
		self.message = data['message']

class Reply:
	def __init__(self, transaction, message):
		self.message = message
		self.transaction = transaction
	def json(self):
		return json.dumps({'id': self.transaction, 'message': self.message})

class Func:
	GetId = 0
	JoinGame = 1
	SetName = 2
	SendPos = 3
	EventChanel = 4
	KeyUp = 100
	KeyDown = 101
	Fire = 102
	MousePos = 103
	DisableMovement = 200
	EnableMovement = 201

class Player(tornado.websocket.WebSocketHandler):
	def open(self):
		self.arena = Arena.getInstance()
		self.sched = Scheduler()
		self.sched.start()
		self.sched.add_interval_job(self.calc_pos, seconds=0.05)
		self.sched.add_interval_job(self.send_pos, seconds=0.05)
		self.pos = Vec3(160, -600, 1500)
		self.rot = Vec2(0,0)
		self.keys = Keys()	
		self.movement_enabled = True
		
		self.pos_transaction = None
		
		self.id = self.arena.addPlayer(self);
		self.active = False;
		
		self.name = None;
		
		print 'new connection'
		
	def on_message(self, string):
		mes = Message(string);
		
		if mes.func == Func.GetId:
			self.write_message(Reply(mes.id, self.id).json());
		
		if mes.func == Func.JoinGame: 
			self.write_message(Reply(mes.id, self.arena.Join(self.id)).json())
			
		if mes.func == Func.SetName:
			self.name = mes.message;
		
		if mes.func == Func.SendPos:
			self.pos_transaction = mes.id;
		
		if mes.func == Func.EventChanel:
			self.event_chanel = mes.id;
		
		if mes.func == Func.KeyDown:
			self.keys.setKey(mes.message, True)
		
		if mes.func == Func.KeyUp:
			self.keys.setKey(mes.message, False)
		
		if mes.func == Func.Fire:
			print 'BANG!'
		
		if mes.func == Func.DisableMovement:
			self.movement_enabled = False
			
		if mes.func == Func.EnableMovement:
			self.movement_enabled = True

		if mes.func == Func.MousePos:
			self.rot = Vec2(mes.message['x'], mes.message['y'])
			
		
	def on_close(self):
		self.arena.Disconnect(self.id)
		self.sched.shutdown()
		print 'connection closed'
	
	def calc_pos(self):
		speed = 80
		theta = -self.rot.y * (math.pi)/180
		theta2 = theta + (math.pi/2)
		dx = 0
		dz = 0
		
		if self.movement_enabled:
			if self.keys.forward:
				dz -= math.cos(theta) * speed
				dx -= math.sin(theta) * speed
			if self.keys.backward:
				dz += math.cos(theta) * speed
				dx += math.sin(theta) * speed
			if self.keys.right:
				dz -= math.cos(theta2) * speed
				dx -= math.sin(theta2) * speed
			if self.keys.left:
				dz += math.cos(theta2) * speed
				dx += math.sin(theta2) * speed
		
		self.pos.x += dx
		self.pos.z += dz
		
	def send_pos(self):
		if self.pos_transaction is not None:
			self.write_message(Reply(self.pos_transaction, self.arena.GetPositions()).json())
			
	def SendEvent(self, event):
		if self.event_chanel is not None:
			self.write_message(Reply(self.event_chanel, event).json())
	
	def getStats():
		return "Unknown"
