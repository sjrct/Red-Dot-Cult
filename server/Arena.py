internal_arena = None
hard_max_active = 10
class Arena:
	def __init__(self):
		self.players = {};
		self.player_count = 0
		self.active_count = 0
	@staticmethod
	def getInstance():
		global internal_arena
		if internal_arena is None:
			internal_arena = Arena()
		return internal_arena

	def addPlayer(self, player):
		self.player_count+=1
		self.players[self.player_count] = player
		return self.player_count
	def Join(self, player_id):
		if self.active_count < hard_max_active and self.players[player_id].active == False:
			self.players[player_id].active = True
	def GetPlayers(self):
		ret = [];
		for player in self.players.itervalues():
			if player.active:
				ret.append({'Name', player.name, 'Stats', player.getStats()});
		return ret;
	def Disconnect(self, player_id):
		del self.players[player_id]
