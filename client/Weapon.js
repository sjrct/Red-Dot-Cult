//
// Weapon.js
//

function Weapon(tag, maxclip, maxres)
{
	this.tag = tag;

	this.maxclip  = maxclip  || 10;
	this.maxres   = maxres   || this.maxclip * 10;

	this.clipammo = this.maxclip;
	this.resammo  = this.maxres;

//	this.gun = new Entity();	
//	this.hand = new Entity();	
}

Weapon.prototype.clone = function()
{
	var w = new Weapon(this.tag, this.maxclip, this.maxres);
	v.clipammo = this.clipammo;
	v.resammo  = this.resammo;
	return w;
}
