#
# collision.py
#

import math
import operator
import Vec
import collision

def _circ_calc(t, a, b):
	return (t*t + a*a - b*b) / (2*t)

def _my_div(x, y):
	if (y == 0): return 0
	return x / y

class Plane:
	def __init__(self, c, pw, ph):
		self.c = c
		self.pw = pw
		self.ph = ph
		
		ow = Vec.op3(pw, c, operator.sub)
		oh = Vec.op3(ph, c, operator.sub)
		self.n = Vec.Vec3( \
			oh.y*ow.z - oh.z*ow.y, \
			oh.z*ow.x - oh.x*ow.z, \
			oh.x*ow.y - oh.y*ow.x)
		
		length = self.n.length()
		self.n.x /= length
		self.n.y /= length
		self.n.z /= length

		self.d = Vec.op3(self.n, c, operator.mul)
		self.w = ow.length()
		self.h = oh.length()
	
	def checkLine(self, point, direction):
		# calculate distance between point and plane
		length = direction.length()
		dire = Vec.Vec3( direction.x/length, direction.y/length, direction.z/length )
		
		bot = Vec.op3(self.n, dire, operator.mul)
		if bot.x == 0 and bot.y == 0 and bot.z == 0: return False

		subd = Vec.op3(self.n, point, operator.mul)
		top  = Vec.op3(self.d, subd, operator.sub)
		dist = Vec.op3(top, bot, collision._my_div)

		# check distance and direction
		if (dist.x < 0 or dist.y < 0 or dist.z < 0):
			return False
		if (direction.length() <= dist.length()):
			return False
		
		# calculate intersection point
		dist = Vec.op3(dist, dire, operator.mul)
		inter = Vec.op3(point, dist, operator.add)

		# calculate radii
		rc = Vec.op3(self.c, inter, operator.sub).length()
		rw = Vec.op3(self.pw, inter, operator.sub).length()
		rh = Vec.op3(self.ph, inter, operator.sub).length()

		# calc 2d coords		
		x = collision._circ_calc(self.w, rc, rw)
		y = collision._circ_calc(self.h, rc, rh)

		# check bounds
		if (x < 0 or x > self.w): return False
		if (y < 0 or y > self.h): return False
		
		return True
