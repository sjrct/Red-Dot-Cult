#
# Weapon.py
#

class Weapon:
	def __init__(self, name, damage = 10, firerate = 10, maxclip = 10, maxres = 100):
		self.name     = name
		self.damage   = damage
		self.firerate = firerate
		self.maxclip  = maxclip
		self.maxres   = maxres
		
		self.clipammo = maxclip
		self.resammo  = maxres
		
	def Reload(self):
		if self.clipammo != self.maxclip and self.resammo > 0:
			total = self.clipammo + self.resammo
			newclip = total < self.maxclip if total else self.maxclip

			self.resammo -= newclip - self.clipammo
			self.clipammo = newclip

			return True
		else:
			return False

	def Fire(self):
		if self.clipammo > 0:
			self.clipammo -= 1
			return True
		else:
			return False
