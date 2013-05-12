
//var proto;
var _mId = 0;
var match = {"questions": [
    {
    "question": "4 + ? = 6",
		"type": "image",
		"first": "fivehippos",
		"second": "fourelephants",
		"third": "threegiraffes",
    "answer": "third"
    },
    { 
    "question": "3 + 5 =",
		"type": "text",
		"first": "6",
		"second": "8",
		"third": "9",
    "answer": "second"
    },
    {
        "question": "1 + 4 =",
		"type": "text",
		"first": "5",
		"second": "7",
		"third": "6",
        "answer": "first"
    },
    {
        "question": "fivestraws.png",
		"type": "image",
		"first": "7",
		"second": "5",
		"third": "6",
        "answer": "second"
    },
    {
        "question": "sixmix.png",
		"type": "image",
		"first": "6",
		"second": "4",
		"third": "8",
        "answer": "first"
    },
    {
        "question": "threetomato.png",
		"type": "image",
		"first": "2",
		"second": "4",
		"third": "3",
        "answer": "third"
    }
]};


function Matching(stage) {

	// Dimensionless
//	this.Cd = 0.47;
	
	// kg / m^3 density
//	this.rho = 1.22;
	
	// m^2  (40 is object radius)
//	this.A = Math.PI * 40 * 40 / (10000);
	
	// m / s^2  gravity
//	this.ag = 6.81;
	
	// kg
//	this.mass = .1;
	
	// kineticjs objects
//	this.question = null;
//	proto = this;

	// create layer
	this.layer = new Kinetic.Layer();
		
	// add layer to stage
	stage.add(this.layer);
	
	// add Level 2 matching objects to layer
	this.initMatchingEntities();
	
	// render the layer
	this.layer.draw();

}


Matching.prototype.initMatchingEntities = function() {

	// define layout placeholders
	
	this.question = new Kinetic.TextPath({
		fontSize: 78, fontFamily: 'JungleFeverRegular', fill: 'white',
		shadowColor: 'black', shadowBlur: 20, shadowOffsetX: 4, shadowOffsetY: 4, 
		stroke: 'green', strokeWidth: 2,
    text: "",
    data: 'M30,250 S350,190 399,277'
	});
  
	this.first = new Kinetic.Image({
		image: "",      // no image!
		x: 200, y: 530,
		width: 100, height: 80,
    offset: [50, 40],
		draggable: true,
		dragOnTop: false,
    dragBoundFunc: function(pos) {
      return {
        x: (pos.x < _x1 ? _x1 : (pos.x > _x2 ? _x2 : pos.x)),
        y: (pos.y < _y1 ? _y1 : (pos.y > _y2 ? _y2 : pos.y))
      };
    }
	});

	this.second = new Kinetic.Image({
		image: "",
		x: 100, y: 430,
		width: 100, height: 80,
    offset: [50, 40],
		draggable: true,
		dragOnTop: false,
    dragBoundFunc: function(pos) {
      return {
        x: (pos.x < _x1 ? _x1 : (pos.x > _x2 ? _x2 : pos.x)),
        y: (pos.y < _y1 ? _y1 : (pos.y > _y2 ? _y2 : pos.y))
      };
    }
	});

	this.third = new Kinetic.Image({
		image: "",
		x: 10, y: 330,
		width: 100, height: 80,
    offset: [50, 40],
		draggable: true,
		dragOnTop: false,
    dragBoundFunc: function(pos) {
      return {
        x: (pos.x < _x1 ? _x1 : (pos.x > _x2 ? _x2 : pos.x)),
        y: (pos.y < _y1 ? _y1 : (pos.y > _y2 ? _y2 : pos.y))
      };
    }
	});


	// add objects to layer
	this.layer.add(this.question);
  
	this.layer.add(this.first);
	this.layer.add(this.second);
	this.layer.add(this.third);

  
	// define animation
//	this.anim = new Kinetic.Animation(this.animate, this.layer);

	
	// events
/*
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
*/

}


// index is current question
Matching.prototype.loadQuestion = function(index) {

	// previous question
  // reset attributes of each object!!!!!
	
	//if(quiz.questions[index].type == "text") {
  this.question.setText(match.questions[index].question);
	//}
	//else {		// image
	//	this.loadImage(index);
	//}
	
	// load associated answer choices
  this.first.setAttrs( { image: images[match.questions[index].first] } );
  this.second.setAttrs( { image: images[match.questions[index].second] } );
  this.third.setAttrs( { image: images[match.questions[index].third] } );
	
	// set flag
	//_pFlag = quiz.questions[index].type;
	
	this.layer.draw();

}

/*
Matching.prototype.setX = function(x) {
	this.banana.attrs.x = x;
}

Matching.prototype.getX = function() {
	return this.banana.attrs.x;
}

Matching.prototype.setY = function(y) {
	this.banana.attrs.y = y;
}

Matching.prototype.getY = function() {
	return this.banana.attrs.y;
}

Matching.prototype.setVX = function(vx) {
	this.banana.attrs.vx = vx;
}

Matching.prototype.getVX = function() {
	return this.banana.attrs.vx;
}

Matching.prototype.setVY = function(vy) {
	this.banana.attrs.vy = vy;
}

Matching.prototype.getVY = function() {
	return this.banana.attrs.vy;
}

Matching.prototype.setLaunch = function(value) {
	this.banana.attrs.launch = value;
}

Matching.prototype.getLaunch = function() {
	return this.banana.attrs.launch;
}
*/

/*
Matching.prototype.resetBanana = function() {
	
	this.setLaunch(false);
	proto.anim.stop();
	this.setX(_App.sling.getSlingPosX());
	this.setY(_App.sling.getSlingPosY());
	this.setVX(0), this.setVY(0);
	this.layer.draw();
	
}
*/
