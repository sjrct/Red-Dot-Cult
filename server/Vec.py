#
# Vec.py
#

class Vec3:
	def __init__(self, x=0, y=0, z=0):
		self.x = float(x)
		self.y = float(y)
		self.z = float(z)

def op3(a, b, f):
	return Vec3( f(a.x, b.x), f(a.y, b.y), f(a.z, b.z) )


class Vec2:
	def __init__(self, x=0, y=0):
		self.x = float(x)
		self.y = float(y)

def op2(a, b, f):
	return Vec2( f(a.x, b.x), f(a.y, b.y) )
