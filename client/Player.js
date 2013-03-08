//
// Player.js
//

function Player(tag)
{
	this.tag = tag;
	this.health = Player.MAX_HEALTH;
	this.weapons = [];
	this.pos = new Vector3(0, 0, 0);
	this.rot = new Vector3(0, 0, 0);

//	this.entity = new Entity("player.obj");
}

Player.MAX_HEALTH = 100;
