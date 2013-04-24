var foo = new Vector3(80,-100,0);
var bar = new Vector3(-80,100,0);

var fl = new Vector3(100,-300,0);
var bl = new Vector3(-100,300,0);

player = {
	animations: {
		arm: {
			'0%'	: { transform: translate3d(foo) + rotate3d(new Vector3(0,0,0)) + translate3d(bar) },
			'50%'	: { transform: translate3d(foo) + rotate3d(new Vector3(0,-90,0)) + translate3d(bar) },
			'100%'	: { transform: translate3d(foo) + rotate3d(new Vector3(0,0,0)) + translate3d(bar) },
		},
		lleg: {
			'0%'	: { transform: translate3d(fl) + rotate3d(new Vector3(45,0,0)) + translate3d(bl) },
			'50%'	: { transform: translate3d(fl) + rotate3d(new Vector3(-45,0,0)) + translate3d(bl) },
			'100%'	: { transform: translate3d(fl) + rotate3d(new Vector3(45,0,0)) + translate3d(bl) },
		},
		rleg: {
			'0%'	: { transform: translate3d(fl) + rotate3d(new Vector3(-45,0,0)) + translate3d(bl) },
			'50%'	: { transform: translate3d(fl) + rotate3d(new Vector3(45,0,0)) + translate3d(bl) },
			'100%'	: { transform: translate3d(fl) + rotate3d(new Vector3(-45,0,0)) + translate3d(bl) },
		}

	},


	objects: [
		{ name: 'torso', model:'player_torso' },
		{ name: 'arm_left', model:'player_arm', },
		{ name: 'arm_right', model:'player_arm', animation:'arm', rotation: new Vector3(0,0,-90) },
		{ name: 'leg_left', model:'player_leg', animation: 'lleg'},
		{ name: 'leg_right', model:'player_leg', scale: new Vector3(-1,1,1), animation: 'rleg' },
	],
	

};

player.type = Entity.ModelType.ComplexModel;
