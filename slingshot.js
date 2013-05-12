

function Sling(stage) {

	this.slingPosX = 200;
	this.slingPosY = 530;
	
	this.points = [100, 521, this.slingPosX, this.slingPosY + 20, 286, 510];

	// create layer
	this.layer = new Kinetic.Layer();
		
	// add layer to stage
	stage.add(this.layer);
	
	// add sling shot to layer
	this.initSlingShot();
	
	// render the layer
	this.layer.draw();

}

Sling.prototype.initSlingShot = function() {

	// define objects
	
	this.slingshot = new Kinetic.Spline({
		points: this.points,
		strokeWidth: 7,
		stroke: 'green',
		lineCap: 'round',
		opacity: .9,
		pulled: false		// custom property
	});

	// define animation
	this.slingshot.setTension(.5);	

	// add objects to layer
	this.layer.add(this.slingshot);

}


Sling.prototype.setPulled = function(value) {
	this.slingshot.attrs.pulled = value;
}

Sling.prototype.getPulled = function() {
	return this.slingshot.attrs.pulled;
}


Sling.prototype.getSlingPosX = function() {
	return this.slingPosX;
}

Sling.prototype.getSlingPosY = function() {
	return this.slingPosY;
}


Sling.prototype.drawSling = function(x, y) {

	//this.layer.clear();
	
	this.points[2] = x;
	if(y + 12 >= _gHeight) {
		this.points[3] = _gHeight;
	}
	else {
		this.points[3] = y + 12;
	}
	this.slingshot.setPoints(this.points);
	
	this.setPulled(true);
	
	// re-render layer
	this.layer.draw();

}
