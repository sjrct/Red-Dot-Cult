import tornado.httpserver
import tornado.websocket
import tornado.ioloop
import tornado.web
import math
import json
from apscheduler.scheduler import Scheduler

hard_messages = ['Snell Arena;Science Center Showdown;C.A.M.P. Implosion', 'testlvl']

class Vec3:
	def __init__(self, x=0, y=0, z=0):
		self.x = float(x)
		self.y = float(y)
		self.z = float(z)
class Vec2:
	def __init__(self, x=0, y=0):
		self.x = float(x)
		self.y = float(y)

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

class Func:
	SendState = 0
	KeyUp = 100
	KeyDown = 101
	Fire = 102
	MousePos = 103

class Player(tornado.websocket.WebSocketHandler):
	def open(self):
		self.sched = Scheduler()
		self.sched.start()
		self.sched.add_interval_job(self.sender, seconds=0.05)
		
		self.pos = Vec3(160, 600, 1500)
		self.rot = Vec2(0,0)
		self.keys = Keys()
		
		self.pos_transaction = None
		
		print 'new connection'
		
	def on_message(self, string):
		mes = Message(string);
		
		if mes.func == Func.SendState:
			self.pos_transaction = mes.id
		
		if mes.func == Func.KeyDown:
			self.keys.setKey(mes.message, True)
		
		if mes.func == Func.KeyUp:
			self.keys.setKey(mes.message, False)
		
		if mes.func == Func.Fire:
			print 'BANG!'
		
		if mes.func == Func.MousePos:
			self.rot = Vec2(mes.message['x'], mes.message['y'])
		
	def on_close(self):
		self.sched.shutdown()
		print 'connection closed'
	
	def sender(self):
		if self.pos_transaction != None:
			speed = 80
			theta = -self.rot.y * (math.pi)/180
			theta2 = theta + (math.pi/2)
			dx = 0
			dz = 0
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
			message = json.dumps({'id': self.pos_transaction, 'message': {'x' : -self.pos.x, 'y' : -self.pos.y, 'z' : -self.pos.z}})
			self.write_message(message)

application = tornado.web.Application([(r'/ws', Player),])


if __name__ == "__main__":
	http_server = tornado.httpserver.HTTPServer(application)
	http_server.listen(8888)
	tornado.ioloop.IOLoop.instance().start()
