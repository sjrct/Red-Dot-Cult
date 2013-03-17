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
	
	Hud.menu_shown = false;
	Hud.set_menu = function(m) {
		var tm = $("#topmenu");
		var margin = 15;
		var padding = 5;
		var width = 0;
		var height = margin;
		Hud.stop_menu();

		tm.css('width', 'auto');
		tm.css('height', 'auto');
		
		for (var i = 0; i < m.btn_txt.length; i++) {
			var d = document.createElement('div');
			tm.append(d);
			
			d.className = 'button';
			$(d).html(m.btn_txt[i]);
			$(d).click(m.btn_hdl[i]);
			$(d).css('margin', margin);
			$(d).css('padding', padding);
			
			width = Math.max(width, $(d).width());
			height += $(d).height() + margin + padding*2;
		}
		
		var scw = $(document).width();
		var sch = $(document).height();
		
		width += margin*2 + padding*2;
		
		tm.css('left', scw/2 - width/2);
		tm.css('top', sch/2 - height/2);
		tm.css('width', width);
		tm.css('height', height);
		Hud.menu_shown = true;
	}
	
	Hud.stop_menu = function() {
		var tm = document.getElementById("topmenu");
		while (tm.hasChildNodes()) {
			tm.removeChild(tm.lastChild);
		}
		
		$("#topmenu").css('width', 0);
		$("#topmenu").css('height', 0);
		Hud.menu_shown = false;
	}
	
	Hud.Menu = function() {
		this.btn_txt = [];
		this.btn_hdl = [];
	}
	
	Hud.Menu.prototype = {
		add : function(txt, hdl) {
			this.btn_txt.push(txt);
			this.btn_hdl.push(hdl);
		}
	};
});
