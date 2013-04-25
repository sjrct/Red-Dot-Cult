side_main = {
	objects: [
	//middle
		//center
		{ name: 'floor1', model: 'floor_small', location: new Vector3( 1000,0, 0000)},
		{ name: 'floor1', model: 'floor_small', location: new Vector3( 1400,0, 0000)},
		//far
		{ name: 'floor1', model: 'floor_small', location: new Vector3( 1800,0, 0000)},
		{ name: 'floor1', model: 'floor_small', location: new Vector3( 1800,0, 0620)},
		{ name: 'floor1', model: 'floor_small', location: new Vector3( 1800,0,-0620)},
	
		{ name: 'floor1', model: 'floor_small', location: new Vector3( 1000,300, 0000)},
		{ name: 'floor1', model: 'floor_small', location: new Vector3( 1400,300, 0000)},
		//far
		{ name: 'floor1', model: 'floor_small', location: new Vector3( 1800,300, 0000)},
		{ name: 'floor1', model: 'floor_small', location: new Vector3( 1800,300, 0620)},
		{ name: 'floor1', model: 'floor_small', location: new Vector3( 1800,300,-0620)},
	






		{ name: 'wall', model: 'wall', location: new Vector3(1000,0,1500), rotation: new Vector3(0,90,0), scale: new Vector3(1,1,0.4) },
		{ name: 'wall', model: 'wall', location: new Vector3(1000,0,-1500), rotation: new Vector3(0,90,0), scale: new Vector3(1,1,0.4) },
		{ name: 'wallsmall', model: 'wall_small', location: new Vector3(1000,300,00), rotation: new Vector3(0,90,0), scale: new Vector3(1,0.84,1)  },
		//enterance walls
		{ name: 'wallsmall', model: 'wall_small', location: new Vector3(1200,0,-200), rotation: new Vector3(0,0,0)  },
		{ name: 'wallsmall', model: 'wall_small', location: new Vector3(1200,0, 200), rotation: new Vector3(0,0,0)  },

		{ name: 'wallsmall', model: 'wall_small', location: new Vector3(1600,0,-200), rotation: new Vector3(0,0,0)  },
		{ name: 'wallsmall', model: 'wall_small', location: new Vector3(1600,0, 200), rotation: new Vector3(0,0,0)  },

		{ name: 'wallsmall', model: 'wall_small', location: new Vector3(2000,0,-600), rotation: new Vector3(0,0,0)  },
		{ name: 'wallsmall', model: 'wall_small', location: new Vector3(2000,0, 600), rotation: new Vector3(0,0,0)  },


		{ name: 'wallsmall', model: 'wall_small', location: new Vector3(1800,0, 400), rotation: new Vector3(0,90,0)  },
		{ name: 'wallsmall', model: 'wall_small', location: new Vector3(1800,0, -400), rotation: new Vector3(0,90,0)  },
		
		{ name: 'wallsmall', model: 'wall_small', location: new Vector3(2200,0, 400), rotation: new Vector3(0,90,0)  },
		{ name: 'wallsmall', model: 'wall_small', location: new Vector3(2200,0, -400), rotation: new Vector3(0,90,0)  },
		{ name: 'wallsmall', model: 'wall_small', location: new Vector3(2200,0, 00), rotation: new Vector3(0,90,0)  },
	]
}

side_main.type = Entity.ModelType.ComplexModel;
