
var proto;

function Shot(stage) {

	// Dimensionless
	this.Cd = 0.47;
	
	// kg / m^3 density
	this.rho = 1.22;
	
	// m^2  (40 is object radius)
	this.A = Math.PI * 40 * 40 / (10000);
	
	// m / s^2  gravity
	this.ag = 6.81;
	
	// kg
	this.mass = .1;
	
	// kineticjs objects
	this.banana = null, this.anim = null;
	proto = this;

	// create layer
	this.layer = new Kinetic.Layer();
		
	// add layer to stage
	stage.add(this.layer);
	
	// add banana object to layer
	this.initBananaEntity();
	
	// render the layer
	this.layer.draw();

}


Shot.prototype.initBananaEntity = function() {

	// define objects
	
	this.banana = new Kinetic.Image({
		image: images.banana,
		x: 200, y: 530,
		width: 100, height: 80,
		offset: [50, 40],
		draggable: true,
		dragOnTop: false,
		vx: 0,					// custom properties for velocity and last position
		vy: 0,
		lastPosX: 0,
		lastPosY: 0,
		launch: false
	});

	// add objects to layer
	this.layer.add(this.banana);

	// define animation
	this.anim = new Kinetic.Animation(this.animate, this.layer);
	
	// events
	
	this.banana.on("dragstart", function(){
	
		this.attrs.launch = false;
		this.attrs.lastPosX = this.attrs.x;
		this.attrs.lastPosY = this.attrs.y;
		
		if (!proto.anim.isRunning()) { proto.layer.clear(); proto.anim.start();}
					
	});
				
	this.banana.on("dragmove", function() {

        // bound drag area
		if (this.attrs.y < _App.sling.getSlingPosY()) { proto.resetBanana(); proto.anim.stop(); }
		//else if (this.attrs.y > 710) { proto.resetBanana(); proto.anim.stop(); }
		//else if (this.attrs.x < 100) { proto.resetBanana(); proto.anim.stop(); }
		//else if (this.attrs.x > 300) { proto.resetBanana(); proto.anim.stop(); }

		// update slingshot with movement of bananas
		_App.sling.drawSling(this.attrs.x, this.attrs.y);

	});
				
	this.banana.on("dragend", function() {

		// calculate how far pulled back
		this.attrs.vy = (this.attrs.lastPosY - this.attrs.y) / 10;
		this.attrs.vx = (this.attrs.lastPosX - this.attrs.x) / 10;
		this.attrs.launch = true;
		//if(this.attrs.vx > 8.0) { this.attrs.vx = 4.5; };
		//if(this.attrs.vy < -12.4) { this.attrs.vy = -12.4; };
		
	});
	

}


Shot.prototype.setX = function(x) {
	this.banana.attrs.x = x;
}

Shot.prototype.getX = function() {
	return this.banana.attrs.x;
}

Shot.prototype.setY = function(y) {
	this.banana.attrs.y = y;
}

Shot.prototype.getY = function() {
	return this.banana.attrs.y;
}

Shot.prototype.setVX = function(vx) {
	this.banana.attrs.vx = vx;
}

Shot.prototype.getVX = function() {
	return this.banana.attrs.vx;
}

Shot.prototype.setVY = function(vy) {
	this.banana.attrs.vy = vy;
}

Shot.prototype.getVY = function() {
	return this.banana.attrs.vy;
}

Shot.prototype.setLaunch = function(value) {
	this.banana.attrs.launch = value;
}

Shot.prototype.getLaunch = function() {
	return this.banana.attrs.launch;
}


// animation function
Shot.prototype.animate = function(frame) {
	var time = frame.time,
		timeDiff = frame.timeDiff;		// ms
		//frameRate = frame.frameRate;	// fps

  var x = proto.getX(), 
      y = proto.getY(),
      vx = proto.getVX(), 
      vy = proto.getVY(),
      radius = 40;
		
	var frameRate = 1/40;				// slower fps

	// user has let go of the object
	if (proto.getLaunch()) {
	
		// drag force: Fd = -1/2 * Cd * A * rho * v * v
		var Fx = -0.5 * this.Cd * this.A * this.rho * vx * vx * vx / Math.abs(vx);
		var Fy = -0.5 * this.Cd * this.A * this.rho * vy * vy * vy / Math.abs(vy);
			
		Fx = (isNaN(Fx) ? 0 : Fx);
		Fy = (isNaN(Fy) ? 0 : Fy);
			
		// calculate acceleration ( F = ma )
		var ax = Fx / this.mass;
		var ay = this.ag + (Fy / this.mass);
		
		// integrate to get position
		x += vx * frameRate * 70;
		y += vy * frameRate * 70;
		
	}	// (banana.attrs.launch == true)
	 
  // more physics variables
  var collisionDamper = 0.5;
  // 20% energy loss
  var floorFriction = 5;
  // px / second^2
  var floorFrictionSpeedReduction = floorFriction * timeDiff / 1000;

	// ceiling condition, fly off canvas and reset
	if(y < -100) { 
		x = _App.sling.getSlingPosX(), y = _App.sling.getSlingPosY();
		proto.setLaunch(false);
	}
	
  // right wall condition
  if(x > (_gWidth - radius)) {
    x = _gWidth - radius;
    proto.setVX(vx *= -1);
    proto.setVX(vx *= (1 - collisionDamper));
  }

  // left wall condition
  if(x < radius) {
    x = radius;
    proto.setVX(vx *= -1);
    proto.setVX(vx *= (1 - collisionDamper));
  }

	proto.banana.setPosition(x, y);		// place object in new position

	
	// slingshot needs to follow banana out of the gate and snap back
	if (proto.getLaunch() && _App.sling.getPulled()) {
		if (y > (_App.sling.getSlingPosY() - 60)) {
			// update slingshot
			_App.sling.drawSling(proto.getX(), proto.getY());
		}
		else {
			_App.sling.setPulled(false);
			// reset to initial state
			_App.sling.drawSling(_App.sling.getSlingPosX(), _App.sling.getSlingPosY() + 10);
		}
	}
	
	// correct answer!
	if(_App.answers.isNearTarget(proto.banana)) {
		proto.anim.stop();
		director.refresh.attrs.visible = true;
		director.controlLayer.draw();
		_App.treesprite.start();
		if(director.soundon) { soundManager.play('aSound'); }
	}
	

}


Shot.prototype.resetBanana = function() {
	
	this.setLaunch(false);
	proto.anim.stop();
  
	// reset banana in slingshot
	proto.banana.setPosition(_App.sling.getSlingPosX(), _App.sling.getSlingPosY());
  
	this.setVX(0), this.setVY(0);
	this.layer.draw();
	
}
