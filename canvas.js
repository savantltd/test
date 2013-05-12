

function Scene(stage) {

	// define properties
	
	this.jungle = new Kinetic.Image({
		image: images.background, x: 0, y: 0, width: _gWidth, height: _gHeight });

	this.leaf2 = new Kinetic.Image({
		image: images.leaf2, x: -40, y: 340, width: 140, height: 360 });

	this.leaf3 = new Kinetic.Image({
		image: images.leaf3, x: 0, y: 0, width: 200, height: 300 });

	// create layer
	this.layer = new Kinetic.Layer();
		
	// add layer to stage
	stage.add(this.layer);
	
	// Add objects to layer
	this.layer.add(this.jungle);
	this.layer.add(this.leaf3);			// order added matters
	this.layer.add(this.leaf2);
	
	// render the layer
	this.layer.draw();

}



function Paper(stage) {

	// define properties
	
	this.paper = new Kinetic.Image({
		image: images.paper, x: 0, y: 30, width: 410, height: 650 });
					
	this.bambooleft = new Kinetic.Image({image: images.bambooleft, x: 70, y: 490});
	this.bambooright = new Kinetic.Image({image: images.bambooright, x: 260, y: 480});

//	this.scratchhead = new Kinetic.Image({
//		image: images.scratchhead, x: 270, y: 560 });

	this.scoreboard = new Kinetic.Image({
		image: images.scoreboard, x: -30, y: -40, width: 400, height: 300 });

//	this.stalk = new Kinetic.Image({
//		image: images.bamboostalk, x: _gWidth-170, y: _gHeight-340, width: 170, height: 340 });
//	this.basket = new Kinetic.Image({
//		image: images.basket, x: _gWidth-200, y: _gHeight-140, width: 192, height: 120 });
	
	// create layer
	this.layer = new Kinetic.Layer();
		
	// add layer to stage
	stage.add(this.layer);
	
	// Add objects to layer
	this.layer.add(this.paper);
	this.layer.add(this.scoreboard);
	this.layer.add(this.bambooleft);
	this.layer.add(this.bambooright);
//	this.layer.add(this.scratchhead);
//  this.layer.add(this.basket);
	
	// render the layer
	this.layer.draw();

}

