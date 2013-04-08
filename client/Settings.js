//
// settings.js
//

Settings = {
	Defaults : {
		control_left:   65,	// a key
		control_up:     87,	// w key
		control_right:  68,	// d key
		control_down:   83,	// s key
		control_reload: 17,	// ctrl
		control_menu:   27,	// escape
		
		volume: 100,
		player_name: '',
	},

	set_defaults : function()
	{
		for (k in Settings.Defaults) {
			Settings.set(k, Settings.Defaults[k]);
		}
	},

	set : function(name, value) {			
		Settings[name] = value;

		if (Utils.IsDefined(Storage)) {
			localStorage[name] = value;
		}
	},
};

function _init_settings()
{	
	if (Utils.IsDefined(Storage))
	{
		for (k in Settings.Defaults) {
			if (!Utils.IsDefined(localStorage[k])) {
				localStorage[k] = Settings.Defaults[k];
			}
			Settings[k] = localStorage[k];
		}
	}
	else
	{
		set_default_settings();
	}
}
_init_settings();
