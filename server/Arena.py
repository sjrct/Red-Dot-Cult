internal_arena = None
class Arena:
	def __init__(self):
		self.players = [];
	@staticmethod
	def getInstance():
		global internal_arena
		if internal_arena is None:
			internal_arena = Arena()
		return internal_arena
	def addPlayer(self, player):
		self.players.append(player)
		print 'foo'
