

function treeSprite(stage) {

	this.animations = {
		jump: [{
			x: 401,
			y: 802,
			width: 400,
			height: 400
		}, {
			x: 401,
			y: 2406,
			width: 400,
			height: 400
		}, {
			x: 0,
			y: 1203,
			width: 400,
			height: 400
		}, {
			x: 401,
			y: 1203,
			width: 400,
			height: 400
		}, {
			x: 0,
			y: 0,
			width: 400,
			height: 400
		}, {
			x: 0,
			y: 4010,
			width: 400,
			height: 400
		}, {
			x: 0,
			y: 2807,
			width: 400,
			height: 400
		}, {
			x: 0,
			y: 802,
			width: 400,
			height: 400
		}, {
			x: 0,
			y: 1604,
			width: 400,
			height: 400
		}, {
			x: 0,
			y: 3609,
			width: 400,
			height: 400
		}, {
			x: 401,
			y: 2005,
			width: 400,
			height: 400
		}, {
			x: 0,
			y: 3208,
			width: 400,
			height: 400
		}, {
			x: 401,
			y: 4010,
			width: 400,
			height: 400
		}, {
			x: 401,
			y: 1604,
			width: 400,
			height: 400
		}, {
			x: 401,
			y: 401,
			width: 400,
			height: 400
		}, {
			x: 0,
			y: 2005,
			width: 400,
			height: 400
		}, {
			x: 401,
			y: 3609,
			width: 400,
			height: 400
		}, {
			x: 401,
			y: 2807,
			width: 400,
			height: 400
		}, {
			x: 401,
			y: 0,
			width: 400,
			height: 400
		}, {
			x: 401,
			y: 3208,
			width: 400,
			height: 400
		}, {
			x: 0,
			y: 2406,
			width: 400,
			height: 400
		}, {
			x: 0,
			y: 401,
			width: 400,
			height: 400
		}]
	};
	
	// create layer
	this.layer = new Kinetic.Layer();
		
	// add layer to stage
	stage.add(this.layer);
	
	// add sprite to layer
	this.initSpriteEntity();
	
	// render the layer
	this.layer.draw();

}


treeSprite.prototype.initSpriteEntity = function() {

	// define objects
	
	this.tree = new Kinetic.Sprite({
		x: 260, y: 40,
		image: images.treesprite,
		animation: 'jump',
		animations: this.animations,
		frameRate: 10
	});

	
	// define events
	this.tree.setRotation(Math.PI / 14);
	
	// add objects to layer
	this.layer.add(this.tree);
	

}


treeSprite.prototype.start = function() {

	// run once
	this.tree.afterFrame(21, function() {
		this.stop();
	});

	// start the animation
	this.tree.start();
}


treeSprite.prototype.rotate = function(number, duration) {

	this.tree.transitionTo({
		rotation: number * Math.PI,
		duration: duration
	});

}