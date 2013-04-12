internal_arena = None
hard_max_active = 10
class Arena:
	def __init__(self):
		self.players = {};
		self.active_count = 0
	@staticmethod
	def getInstance():
		global internal_arena
		if internal_arena is None:
			internal_arena = Arena()
		return internal_arena

	def addPlayer(self, player):
		self.players[len(self.players)] = player
		return len(self.players)-1
	
	def Join(self, player_id):
		if self.active_count < hard_max_active and self.players[player_id].active == False:
			self.players[player_id].active = True
		self.active_count +=1;
	
	def GetPlayers(self):
		ret = [];
		for player in self.players.itervalues():
			if player.name is not None:
				ret.append({'Id': player.id, 'Name': player.name, 'Stats': player.getStats(), 'Active': player.active});
		return ret;
		
	def GetPositions(self):
		ret = []
		for player in self.players.itervalues():
			if player.name is not None:
				ret.append({'Id': player.id, 'Position': player.pos.toDict(), 'Active': player.active});
		return ret;
	
	def Disconnect(self, player_id):
		if self.players[player_id].active:
			self.active_count -=1
		del self.players[player_id]
