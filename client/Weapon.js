//
// Weapon.js
//

function Weapon(tag, damage, firerate, maxclip, maxres)
{
	this.tag = tag;

	this.damage   = damage   || 10;
	this.firerate = firerate || 10;
	this.maxclip  = maxclip  || 10;
	this.maxres   = maxres   || 100;

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

Weapon.prototype.reload = function()
{
	if (this.clipammo != this.maxclip && this.resammo > 0) {
		var total = this.clipammo + this.resammo;		
		var newclip = total < this.maxclip ? total : this.maxclip;
		
		this.clipammo = newclip;
		this.resammo -= newclip - this.clipammo;
	}
}

Weapon.prototype.fire = function()
{
	if (this.clipammo > 0) {
		this.clipammo--;
		return true;
	}
	return false;
}
