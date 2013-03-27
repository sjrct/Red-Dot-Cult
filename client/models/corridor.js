corridor = {
	animations: {
		test1: {
			'0%'	: { transform: translate3d(new Vector3(0,500,0))   + rotate3d(new Vector3(0,0,0)) 	},
			'50%'	: { transform: translate3d(new Vector3(0,500,500)) + rotate3d(new Vector3(0,360,0))	},
			'100%'	: { transform: translate3d(new Vector3(0,500,0))   + rotate3d(new Vector3(360,0,0)) 	},
		},
		test2: {
			'0%' 	: { transform: translate3d(new Vector3(0,0,0)) },
			'50%' 	: { transform: translate3d(new Vector3(0,1000,0)) },
			'100%' 	: { transform: translate3d(new Vector3(0,0,0)) },
		}
	},
	objects: [
		{ name: 'door', model: 'plane', location: new Vector3(500,0,1000), rotation: new Vector3(0,0,0), animation: 'test2' },
		
		{ name: 'wall1-1', model: 'plane', location: new Vector3(-500,0,1000), rotation: new Vector3(0,0,0), },
		{ name: 'wall1-2', model: 'plane', location: new Vector3(-500,0,0), rotation: new Vector3(0,90,0), },
		{ name: 'wall1-3', model: 'plane', location: new Vector3(500,0,0), rotation: new Vector3(0,90,0), },
		{ name: 'floor1', model: 'plane', location: new Vector3(-500,0,-1000), rotation: new Vector3(90,0,0), },
		{ name: 'ceiling1', model: 'plane', location: new Vector3(-500,1000,-1000), rotation: new Vector3(90,0,0), },
		
		{ name: 'wall2-1', model: 'plane', location: new Vector3(-500,0,1000), rotation: new Vector3(0,90,0), },
		{ name: 'floor2', model: 'plane', location: new Vector3(-500,0,0), rotation: new Vector3(90,0,0), },
		{ name: 'ceiling2', model: 'plane', location: new Vector3(-500,1000,0), rotation: new Vector3(90,0,0), },
	],
};

corridor.type = Entity.ModelType.ComplexModel;
