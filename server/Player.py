# Player
import tornado.websocket
from Arena import Arena
from Weapon import Weapon
import math
import json
import random
import collision
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
		self.isopen = True;
		self.arena = Arena.getInstance()
		self.sched = Scheduler()
		self.sched.start()
		self.sched.add_interval_job(self.calc_pos, seconds=0.05)
		self.sched.add_interval_job(self.send_pos, seconds=0.05)
		self.keys = Keys()	
		self.movement_enabled = True
		self.dirty_coll = True
		
		self.pos_transaction = None
		self.id = self.arena.addPlayer(self)
		self.active = False
		self.name = None
		
		self.arena.Join(self.id)

		self.cur_weapon = None
		self.weapons = []
		self.add_weapon(Weapon("Mr. Default Gun"))
		
		self.maxhealth = 100
		self.health = self.maxhealth
		
		self.pos = Vec3()
		self.rot = Vec2()
		self.spawn()
		
		print 'new connection'
	
	def has_weapon(self):
		return self.cur_weapon is not None
	
	def weapon(self):
		return self.weapons[self.cur_weapon]
	
	def add_weapon(self, weap):
		for i in range(len(self.weapons)):
			if self.weapons[i].name == self.weapons[i].name:
				self.weapons[i].resammo += weap.resammo + weap.clipammo;

				if self.weapons[i].resammo > self.weapons[i].maxres:
					self.weapons[i].resammo = self.weapons[i].maxres
				return

		if not self.has_weapon():
			self.cur_weapon = 0

		self.weapons.append(weap)
	
	def injure(self, damage, by):
		self.health -= damage
		
		if self.health <= 0:
			print(self.name + ' died')
			self.health = self.maxhealth
			self.spawn()
			self.weapon().clipammo = self.weapon().maxclip
			self.weapon().resammo = self.weapon().maxres
			self.SendEvent([{ 'mes': 'SetHealth', 'health': self.health }])
			self.arena.BroadcastEvent([{ 'mes': 'Killed', 'who': self.name, 'by': by.name }])
	
	def spawn(self):
		i = random.randint(0, len(self.arena.spawns_pos)-1)
		p = self.arena.spawns_pos[i]
		r = self.arena.spawns_rot[i]

		self.pos.x = p.x
		self.pos.y = p.y
		self.pos.z = p.z
		self.rot.x = r.x
		self.rot.y = r.y
		
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
			if mes.message == 'reload':
				if self.weapon().Reload():
					print 'reloaded'
				else:
					print "can't reload anymore"
			else:
				self.keys.setKey(mes.message, True)
		
		if mes.func == Func.KeyUp:
			if mes.message != 'reload':
				self.keys.setKey(mes.message, False)
		
		if mes.func == Func.Fire:
			if self.has_weapon() and self.weapon().Fire():
				print 'BANG!'
			
				theta = -self.rot.y * (math.pi)/180
				sin = -math.sin(theta)
				cos = -math.cos(theta)
				mod = Vec3(sin, 0, cos)
			
				for plyr in self.arena.players.itervalues():
					if plyr.name is not None and plyr != self:
						plyr.calc_coll_planes()

						a = plyr.pl1.checkLine2(self.pos, mod)
						b = plyr.pl2.checkLine2(self.pos, mod)
						c = plyr.pl3.checkLine2(self.pos, mod)
						d = plyr.pl4.checkLine2(self.pos, mod)

						if a or b or c or d:
							print(self.name + ' hit ' + plyr.name)
							plyr.injure(self.weapon().damage, self)
							plyr.SendEvent([{ 'mes': 'SetHealth', 'health': plyr.health }])
			else:
				print "no ammo left or no gun"
		
		if mes.func == Func.DisableMovement:
			self.movement_enabled = False
			
		if mes.func == Func.EnableMovement:
			self.movement_enabled = True

		if mes.func == Func.MousePos:
			self.rot = Vec2(mes.message['x'], mes.message['y'])
			
		
	def on_close(self):
		self.isopen = False
		self.sched.shutdown()
		self.arena.BroadcastEvent([{ 'mes': 'Left', 'who': self.id }])
		print 'connection closed'
		self.arena.Disconnect(self.id)

	def calc_coll_planes(self):
		if self.dirty_coll:
			w = 60
			yu = 400
			yd = -400

			a1 = Vec3(self.pos.x - w, self.pos.y + yd, self.pos.z - w)
			a2 = Vec3(self.pos.x - w, self.pos.y + yu, self.pos.z - w)
			a3 = Vec3(self.pos.x + w, self.pos.y + yd, self.pos.z - w)

			b1 = Vec3(self.pos.x - w, self.pos.y + yd, self.pos.z + w)
			b2 = Vec3(self.pos.x - w, self.pos.y + yu, self.pos.z + w)
			b3 = Vec3(self.pos.x + w, self.pos.y + yd, self.pos.z + w)

			c1 = Vec3(self.pos.x - w, self.pos.y + yd, self.pos.z - w)
			c2 = Vec3(self.pos.x - w, self.pos.y + yu, self.pos.z - w)
			c3 = Vec3(self.pos.x - w, self.pos.y + yd, self.pos.z + w)

			d1 = Vec3(self.pos.x + w, self.pos.y + yd, self.pos.z - w)
			d2 = Vec3(self.pos.x + w, self.pos.y + yu, self.pos.z - w)
			d3 = Vec3(self.pos.x + w, self.pos.y + yd, self.pos.z + w)

			self.pl1 = collision.Plane(a1, a2, a3)
			self.pl2 = collision.Plane(b1, b2, b3)
			self.pl3 = collision.Plane(c1, c2, c3)
			self.pl4 = collision.Plane(d1, d2, d3)
			
			self.arena.planes.append(self.pl1)
			self.arena.planes.append(self.pl2)
			self.arena.planes.append(self.pl3)
			self.arena.planes.append(self.pl4)
			
			self.dirty_coll = False

	def calc_pos(self):
		if self.movement_enabled:
			speed = 15
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

			done = (dx == 0 and dz == 0)
			chg = Vec3(dx, 0, dz)
			
			while not done:
				done = True	
				for it in self.arena.planes:
					if it.checkLine(self.pos, chg):
						if dx == 0 or dz == 0 or chg.z == 0:
							chg.x = chg.z = 0
						elif chg.x != 0:
							chg.x = 0
							done = False
						else:
							chg.x = dx
							chg.z = 0
							done = False
						break
			
			if chg.x != 0 or chg.z != 0:
				self.pos.x += chg.x
				self.pos.z += chg.z
				self.dirt_coll = True
		
	def send_pos(self):
		if self.pos_transaction is not None:
			self.write_message(Reply(self.pos_transaction, self.arena.GetPositions()).json())
			
	def SendEvent(self, event):
		if self.event_chanel is not None and self.isopen:
			self.write_message(Reply(self.event_chanel, event).json())
	
	def getStats():
		return "Unknown"
