
/*
 * define director as an obect
 * so that it can be modified by reference
*/
var director = {
  controlLayer: null,
  refresh: null,
  menu: null,
  sound: null,
  soundon: true,
  level1: true,
  level2: false,
  level3: false
};


function Game() {

	// initialize kinetic objects
	this.stage = new Kinetic.Stage({	
		container: "container",
		x: 0, y: 0,
		width: _gWidth,
		height: _gHeight
	});

	// create background
	this.scene = new Scene( this.stage );
	
  // create the tree sprite
  this.treesprite = new treeSprite( this.stage );
	
	// create paper background
	this.paper = new Paper( this.stage );
	
	// create answer targets
	this.answers = new Answers( this.stage );

	// create sling shot
	this.sling = new Sling( this.stage );
	
	// create banana shot
	this.shot = new Shot( this.stage );
  
  // level 2 matching layer
  this.matching = new Matching( this.stage );
this.matching.layer.hide();

	
	///////////////////////////////////////////////////////////
	
	director.controlLayer = new Kinetic.Layer();
	
	director.menu = new Kinetic.Image({
		image: images.menuicon, x: _gWidth-120, y: 4, width: 60, height: 60});
    
	director.sound = new Kinetic.Image({
		image: images.soundon, x: _gWidth-64, y: 30, width: 60, height: 60});
    
	director.refresh = new Kinetic.Image({
		image: images.refresh, x: 160, y: 360, width: 90, height: 90, visible: false });
		
	director.controlLayer.add(director.menu);
	director.controlLayer.add(director.sound);
	director.controlLayer.add(director.refresh);
	
	// add layer to stage
	this.stage.add(director.controlLayer);
	

	// define events
  
  director.menu.on("touchstart mousedown", function() {
    // create menu options
    _App.menu = new Menu( director.controlLayer );
    
  });
  
  
  director.sound.on("touchstart mousedown", function() {
    // toggle soundon
    director.soundon = !director.soundon;
    if(director.soundon) {
      director.sound.setAttrs( { image: images.soundon } );
    }
    else {
      director.sound.setAttrs( { image: images.soundoff } );
    }
    director.controlLayer.draw();
  });
  
  
	director.refresh.on("touchstart mousedown", function() {
	
		//_qId += 1;
		//if(_qId == quiz.questions.length) { _qId = 0; };
		_qId = randomFromTo(0, (quiz.questions.length - 1));	// random
	
		// reset game pieces
		_App.answers.loadQuestion(_qId);
		director.refresh.attrs.visible = false;
		director.controlLayer.draw();
		
		_App.shot.resetBanana();
		
	});

	
//console.log(randomFromTo(0, (quiz.questions.length - 1)));

	// start tree sprite animation
	//this.treesprite.start();
	//this.treesprite.rotate(2, 20);

  // this works!
  //this.treesprite.layer.hide();
  /*
		var src = this.runtime.files_subfolder + file[0] + (useOgg ? ".ogg" : ".m4a");

  */
/////////////////////////////////////////////////////////////////////////
  
  
	// load initial question
	this.answers.loadQuestion(_qId);

	  
}



function Menu(layer) {

  if(director.level1) { _App.answers.layer.hide(); }
  if(director.level2) { _App.matching.layer.hide(); }
  
  director.level1 = director.level2 = director.level3 = false;
  
  // create menu options

  this.level1 = new Kinetic.Image({ image: images.level1, x: 94, y: 240 });
	this.level1.setRotation(Math.PI / -50);
    
  this.level2 = new Kinetic.Image({ image: images.level2, x: 94, y: 290 });
	this.level2.setRotation(Math.PI / 36);
    
	this.level3 = new Kinetic.Image({ image: images.level3, x: 94, y: 370 });
	this.level1.setRotation(Math.PI / -58);
    
	layer.add(this.level1);
	layer.add(this.level2);
	layer.add(this.level3);

  layer.draw();

  // define events
  
  this.level1.on("touchstart mousedown", function() {
    director.level1 = true;
    _App.menu.level1.destroy();
    _App.menu.level2.destroy();
    _App.menu.level3.destroy();
    layer.draw();
    
    _App.answers.layer.show();
    
  });
  
  this.level2.on("touchstart mousedown", function() {
    director.level2 = true;
    _App.menu.level1.destroy();
    _App.menu.level2.destroy();
    _App.menu.level3.destroy();
    layer.draw();

    _App.matching.layer.show();
    // load first question and draw!    
    _App.matching.loadQuestion(_mId);
    
  });
  
  this.level3.on("touchstart mousedown", function() {
    director.level3 = true;
    _App.menu.level1.destroy();
    _App.menu.level2.destroy();
    _App.menu.level3.destroy();
    layer.draw();
  });
  
}
