import tornado.httpserver
import tornado.websocket
import tornado.ioloop
import tornado.web
import math

from apscheduler.scheduler import Scheduler

hard_messages = ['Snell Arena;Science Center Showdown;C.A.M.P. Implosion', 'testlvl']

class WSHandler(tornado.websocket.WebSocketHandler):
	def open(self):
		self.sched = Scheduler()
		self.sched.start()
		self.isrunning = False
		self.sched.add_interval_job(self.sender, seconds=0.05)
		
		self.rotx = 0
		self.roty = 0
		self.posx = 160
		self.posz = 1500
		self.left = False
		self.right = False
		self.up = False
		self.down = False
		
		self.stateback = -1
		
		print 'new connection'
	
	def on_message(self, message):
		split = message.split(":")
		_id = split[0]
		func = int(split[1])
		if len(split) > 2:
			message = split[2]
		
#		print 'message received %s' % message
		
		if func == 1: #chooseArena
			self.isrunning = True
			
		if func == 2: #send state
			self.stateback = _id
			return
		if func == 100: #kd
			if message == 'left':
				self.left = True
			if message == 'right':
				self.right = True
			if message == 'up':
				self.up = True
			if message == 'down':
				self.down = True
		if func == 101: #ku
			if message == 'left':
				self.left = False
			if message == 'right':
				self.right = False
			if message == 'up':
				self.up = False
			if message == 'down':
				self.down = False
		
		
		if func == 103: #mouse pos
			self.rotx = float(message.split(",")[0])
			self.roty = float(message.split(",")[1])
		
		if func < 100:
			self.write_message(_id + ":" + hard_messages[func])
		
	def on_close(self):
		self.sched.shutdown()
		self.isrunning = False
		print 'connection closed'
	
	def sender(self):
		if self.isrunning and self.stateback != -1:
			speed = 80
			theta = -self.roty * (math.pi)/180
			theta2 = theta + (math.pi/2)
			dx = 0
			dz = 0
			if self.up:
				dz -= math.cos(theta) * speed
				dx -= math.sin(theta) * speed
			if self.down:
				dz += math.cos(theta) * speed
				dx += math.sin(theta) * speed
			if self.right:
				dz -= math.cos(theta2) * speed
				dx -= math.sin(theta2) * speed
			if self.left:
				dz += math.cos(theta2) * speed
				dx += math.sin(theta2) * speed
			
			self.posx += dx
			self.posz += dz
			
			message = "{5}:[[{0},{1}],[{2},{3},{4}]]".format(self.rotx, self.roty, self.posx, -600, self.posz, self.stateback)
			self.write_message(message)



application = tornado.web.Application([(r'/ws', WSHandler),])


if __name__ == "__main__":
	http_server = tornado.httpserver.HTTPServer(application)
	http_server.listen(8888)
	tornado.ioloop.IOLoop.instance().start()
