
// global variables			

var images = {};
var _App = null;

var _gWidth = 420, _gHeight = 700;
var _gViewWidth, _gViewHeight;
// bounding box for dragging
var _x1 = 70, _x2 = 340, _y1 = 210, _y2 = 600;

var _qId = 0;
var _pFlag = null;
var quiz = {"questions": [
    {
        "question": "2 + 4 =",
		"type": "text",
		"first": "5",
		"second": "7",
		"third": "6",
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
        "question": "fivestraws",
		"type": "image",
		"first": "7",
		"second": "5",
		"third": "6",
        "answer": "second"
    },
    {
        "question": "sixmix",
		"type": "image",
		"first": "6",
		"second": "4",
		"third": "8",
        "answer": "first"
    },
    {
        "question": "threetomato",
		"type": "image",
		"first": "2",
		"second": "4",
		"third": "3",
        "answer": "third"
    }
]};


// image preloader
function loadImages(sources){
	var loadedImages = 0;
	var numImages = 0;
	for (var src in sources) {		// count number of images in source
		numImages++;
	}
	for (var src in sources) {
		images[src] = new Image();
		images[src].onload = function(){
			if (++loadedImages >= numImages) {
				// once all images loaded, initiate game function
        cl.kill();
				_App = new Game();
				getViewportSize();
				soundManager.setup();
			}
		};
		images[src].src = sources[src];
	}
}


// jQuery document ready function
//$(document).ready(function() {  
window.onload = function() {

	//$(document).ready(getViewportSize);    // when the page first loads
	//$(window).resize(getViewportSize);     // when the browser changes size
	window.onresize = function() {
    _x1 = 70, _x2 = 340, _y1 = 210, _y2 = 600;
    getViewportSize();
		};

	// load questions
/*
	$.ajax({
		url: 'questions.json',
		type: 'GET',
		dataType: 'json',
		//crossDomain: false,
		async: false, 
		error: function(data){ alert("ajax didn't work"); },
		success: function(data){
			//do something with data 
			//console.log(data.questions[0].question);		// 2 + 4 =
			//console.log(data.questions[0].answer);		// third
			//console.log(data.questions.length);		// 3
			$.each(data.questions,function(index,item){
				console.log(data.questions[index].question);
			});
		quiz = data;
		}	// success
	});
*/
	var sources = {
		background: "backdrop.png",
		paper: "paper.png",
		leaf2: "bundle banana leafs.png",
		leaf3: "palm leaf left.png",
		banana: "bananas.png",
		bambooleft: "bambooleft.png",
		bambooright: "bambooright.png",
		silhouette: "bananasilhouette.png",
		treesprite: "treesprites.png",
		scoreboard: "scoreboard.png",
    menuicon: "menuicon.png",
    soundon: "soundon.png",
    soundoff: "soundoff.png",
		refresh: "refresh.png",
		level1: "level1.png",
		level2: "level2.png",
		level3: "level3.png",
    fivestraws: "fivestraws.png",
    sixmix: "sixmix.png",
    threetomato: "threetomato.png",
    fivehippos: "fivehippos.png",   // matching assets
    fourelephants: "fourelephants.png",
    threegiraffes: "threegiraffes.png",
	};
				
	loadImages(sources);	// initialize game once images are loaded

};


/*
 *  if viewport width / stage.width < 1.00 then viewport width is less than _gWidth
 *  if viewport height / stage.height < 1.00 then viewport height is less than _gHeight
*/
function getViewportSize(){
    // get the dimensions of the viewport
    //_gViewWidth = $(window).width();
    //_gViewHeight = $(window).height();
	
	if( typeof( window.innerWidth ) == 'number' ) {
		//Non-IE
		_gViewWidth = window.innerWidth;
		_gViewHeight = window.innerHeight;
	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		//IE 6+ in 'standards compliant mode'
		_gViewWidth = document.documentElement.clientWidth;
		_gViewHeight = document.documentElement.clientHeight;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		//IE 4 compatible
		_gViewWidth = document.body.clientWidth;
		_gViewHeight = document.body.clientHeight;
	}
	
	try {
		if(typeof(_App.stage) != 'undefined' && _App.stage != null) {
			//console.log('Viewport width: '+_gViewWidth);
			var ratio = _gViewHeight / _gHeight;
			if(ratio > 1.0) { 
				_App.stage.setHeight(_gViewHeight);
				_App.stage.setWidth(_gViewWidth);
				// adjust width of background image
				_App.scene.jungle.setWidth(_gWidth * ratio);
			}
			_App.stage.setScale(ratio, ratio);
			_App.stage.draw();
      _x1 *= ratio, _x2 *= ratio, _y1 *= ratio, _y2 *= ratio;
		}
	}
	catch(err) {	// err.message
		console.log(err.message);
		return;
	}
	
}


/*
 * Math.random returns a number between 0 and 1, randomFromTo() 
 * takes two integers as parameters and return a number in the range of the value of the two integers.
*/
function randomFromTo(from, to) {
	return Math.floor(Math.random() * (to - from + 1) + from);
};

