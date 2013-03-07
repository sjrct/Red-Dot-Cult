//
// Weapon.js
//

function Weapon(tag, damage, firerate, maxclip, maxres)
{
	this.tag = tag;

	this.damage   = damage   || 10;
	this.firerate = firerate || 10;
	this.maxclip  = maxclip  || 10;
	this.maxres   = maxres   || 100

	this.clipammo = this.maxclip;
	this.resammo  = this.maxres;
	
//	this.gun = new Entity();	
//	this.hand = new Entity();	
}

Weapon.prototype.clone = function()
{
	var w = new Weapon(this.tag, this.damage, this.firerate, this.maxclip, this.maxres);
	v.clipammo = this.clipammo;
	v.resammo  = this.resammo;
	return w;
}
