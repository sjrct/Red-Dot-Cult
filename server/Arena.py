import collision
import json
import Vec

internal_arena = None
hard_max_active = 10

class Arena:
	def __init__(self):
		self.players = {}
		self.active_count = 0
		self.planes = []
		self.spawns_pos = []
		self.spawns_rot = []
		
		with open('levels/testlvl.json') as fl:
			data = fl.read()
			fl.close()
			level = json.loads(data)
			
			for s in level['spawns']:
				self.spawns_pos.append(Vec.Vec3(s[0][0], s[0][1], s[0][2]))
				self.spawns_rot.append(Vec.Vec2(s[1][0], s[1][1]))
		
			for p in level['planes']:
				self.planes.append(collision.Plane( \
					Vec.Vec3(p[0][0], p[0][1], p[0][2]), \
					Vec.Vec3(p[1][0], p[1][1], p[1][2]), \
					Vec.Vec3(p[2][0], p[2][1], p[2][2])))

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
			if player.name is not None and player.active:
				ret.append({'Id': player.id, 'Name': player.name, 'Stats': player.getStats()});
		return ret;
		
	def GetPositions(self):
		ret = []
		for player in self.players.itervalues():
			if player.name is not None and player.active:
				ret.append({'Id': player.id, 'Position': player.pos.toDict(), 'Rotation': player.rot.toDict(), 'Moving': player.moving});
		return ret;
	
	def BroadcastEvent(self, event):
		for player in self.players.itervalues():
			if player.name is not None:
				player.SendEvent(event)
	
	def Disconnect(self, player_id):
		if self.players[player_id].active:
			self.active_count -=1
			self.players[player_id].active = False
#		del self.players[player_id]
