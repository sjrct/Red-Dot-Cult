//
// Player.js
//

function Player(tag, parent)
{
	this.tag = tag;
	this.health = Player.MAX_HEALTH;
	this.weapons = [];
	this.pos = new Vector3(0, 0, 0);
	this.rot = new Vector3(0, 0, 0);
	this.id = -1;

	this.entity = new Entity.Load(parent, "player");
}

Player.prototype.has_weapon = function() {
	return typeof(this.cur_weap) !== 'undefined';
}

Player.prototype.weapon = function() {
	return this.weapons[this.cur_weap];
}

Player.prototype.add_weapon = function(weap)
{
	for (var i = 0; i < this.weapons.length; i++) {
		if (this.weapons[i].tag == weap.tag) {
			this.weapons[i].resammo += weap.resammo + weap.clipammo;
			if (this.weapons[i].resammo > this.weapons[i].maxres) {
				this.weapons[i].resammo = this.weapons[i].maxres;
			}
			return;
		}
	}
	
	if (!this.has_weapon()) {
		this.cur_weap = 0;
	}
	
	this.weapons.push(weap);
}

Player.MAX_HEALTH = 100;
