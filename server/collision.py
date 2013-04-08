#
# collision.py
#

import math
import operator
import Vec
import collision

def _rot_h(p, sin, cos):
	return Vec.Vec3( p.x*cos - p.y*sin, p.x*sin + p.y*cos, p.z )

def _rot(pnt, rot):
	pnt = collision._rot_h( pnt, math.sin(rot.z), math.cos(rot.z) ).cycle()
	pnt = collision._rot_h( pnt, math.sin(rot.x), math.cos(rot.x) ).cycle()
	pnt = collision._rot_h( pnt, math.sin(rot.y), math.cos(rot.y) ).cycle()
	return pnt

def _circ_calc(r0, x1, r1):
	r0sq = r0 * r0
	x = (r1*r1 - x1*x1 - r0sq) / (-2*x1)
	return Vec.Vec2( x, math.sqrt(r0sq - x*x) )

def _my_div(x, y):
	if (y == 0): return 0
	return x / y

class Plane:
	# Plane(Vec3 position, Vec3 rotation, float width, float height)
	def __init__(self, pos, rot, width, height):
		self.pw = Vec.op3(collision._rot( Vec.Vec3(width), rot ),  pos, operator.add)
		self.ph = Vec.op3(collision._rot( Vec.Vec3(0, height), rot ), pos, operator.add)
		self.n = collision._rot( Vec.Vec3(0, 0, 1), rot )
		self.d = Vec.op3(self.n, pos, operator.mul)
		self.c = pos
		self.w = width
		self.h = height

	def checkLine(self, point, direction):
		# calculate distance between point and plane
		length = direction.length()
		dire = Vec.Vec3( direction.x/length, direction.y/length, direction.z/length )
		
		bot = Vec.op3(self.n, dire, operator.mul)
		if bot.x == 0 and bot.y == 0 and bot.z == 0: return False

		subd = Vec.op3(self.n, point, operator.mul)
		top  = Vec.op3(self.d, subd, operator.sub)
		dist = Vec.op3(top, bot, collision._my_div)

		# check distances
		if (direction.length() <= dist.length()):
			return False
		
		# calculate intersection point
		inter = Vec.op3(point, dist, operator.add)

		# calculate radii
		r0 = Vec.op3(self.c, inter, operator.sub).length()
		r1 = Vec.op3(self.pw, inter, operator.sub).length()
		r2 = Vec.op3(self.ph, inter, operator.sub).length()
		
		a = collision._circ_calc(r0, self.w, r1)
		b = collision._circ_calc(r0, self.h, r2)
		
		# check whether negative y or not
		if ( (a.x == b.y and -a.y == b.x) or (a.x == -b.y and -a.y == b.x) ):
			a.y = -a.y
		
		# check bounds
		if (a.x < 0 or a.x > self.w): return False
		if (a.y < 0 or a.y > self.h): return False
		
		return True
