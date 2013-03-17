testplayer = {
	animations: {
		test1: {
			'0%'	: { transform: translate3d(new Vector3(0,500,0))   + rotate3d(new Vector3(0,0,0)) 	},
			'50%'	: { transform: translate3d(new Vector3(0,500,500)) + rotate3d(new Vector3(0,360,0))	},
			'100%'	: { transform: translate3d(new Vector3(0,500,0))   + rotate3d(new Vector3(360,0,0)) 	},
		},
		test2: {
			'0%' 	: { transform: translate3d(new Vector3(-500,0,0)) },
			'50%' 	: { transform: translate3d(new Vector3(-500,1000,0)) },
			'100%' 	: { transform: translate3d(new Vector3(-500,0,0)) },
		}
	},
	objects: [
		{ name: 'teapot1', model: 'plane', location: new Vector3(500,0,0), rotation: new Vector3(0,0,0), },
		{ name: 'door', model: 'plane', location: new Vector3(500,0,0), rotation: new Vector3(0,0,0), animation: 'test2' },
	],
};

testplayer.type = Entity.ModelType.ComplexModel;
