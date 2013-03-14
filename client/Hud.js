//
// hud.js
//

namespace('Hud', function()
{
	Hud.update_all = function(p) {
		Hud.update_ammo(p);
	}

	Hud.update_ammo = function(plyr) {
		var str;

		if (plyr.has_weapon()) {
			var w = plyr.weapon();
			str = w.tag + ": " + w.clipammo + "/" + w.maxclip + " " + w.resammo;
		} else {
			str = "No Weapon";
		}

		$("#gunhud").html(str);
	}
});
