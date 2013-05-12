

function Answers(stage) {
	
	this.answerIndex = 0;
	this.answers = [
		{imageName: 'imgA', x: 80, y: 290, textName: 'first', text: "", tx: 30, ty: 250},
		{imageName: 'imgB', x: 200, y: 210, textName: 'second', text: "", tx: 150, ty: 170},
		{imageName: 'imgC', x: 330, y: 250, textName: 'third', text: "", tx: 280, ty: 190}
	];
	
	this.refresh = null;
	
	// create layer
	this.layer = new Kinetic.Layer();
		
	// add layer to stage
	stage.add(this.layer);
	
	// add answer targets to layer
	this.initAnswerEntities();
	
	// render the layer
	this.layer.draw();

}


Answers.prototype.addImage = function(image) {
	this.layer.add(image);
	this.layer.draw();
}


Answers.prototype.initAnswerEntities = function() {

	// Define objects
	
	this.firstTarget = new Kinetic.Image({
		image: images.silhouette,
		x: this.answers[0].x, y: this.answers[0].y,
		width: 100, height: 80,
		offset: [50, 40]
	});
		
	this.secondTarget = new Kinetic.Image({
		image: images.silhouette,
		x: this.answers[1].x, y: this.answers[1].y,
		width: 100, height: 80,
		offset: [50, 40]
	});

	this.thirdTarget = new Kinetic.Image({
		image: images.silhouette,
		x: this.answers[2].x, y: this.answers[2].y,
		width: 100, height: 80,
		offset: [50, 40]
	});
	
	this.first = new Kinetic.Text({
		x: this.answers[0].tx, y: this.answers[0].ty,
		text: this.answers[0].text, dragabble: true,
		fontSize: 70, fontFamily: 'JungleFeverRegular', fill: 'white',
		shadowColor: 'black', shadowBlur: 20, shadowOffsetX: 4, shadowOffsetY: 4, 
		stroke: 'black', strokeWidth: 1
	});
		
	this.second = new Kinetic.Text({
		x: this.answers[1].tx, y: this.answers[1].ty,
		text: this.answers[1].text,
		fontSize: 70, fontFamily: 'JungleFeverRegular', fill: 'white',
		shadowColor: 'black', shadowBlur: 20, shadowOffsetX: 4, shadowOffsetY: 4, 
		stroke: 'black', strokeWidth: 1
	});

	this.third = new Kinetic.Text({
		x: this.answers[2].tx, y: this.answers[2].ty,
		text: this.answers[2].text,
		fontSize: 70, fontFamily: 'JungleFeverRegular', fill: 'white',
		shadowColor: 'black', shadowBlur: 20, shadowOffsetX: 4, shadowOffsetY: 4, 
		stroke: 'black', strokeWidth: 1
	});
	
	// question placeholder	
	this.question = new Kinetic.TextPath({
		fontSize: 84, fontFamily: 'JungleFeverRegular', fill: 'white',
		shadowColor: 'black', shadowBlur: 20, shadowOffsetX: 4, shadowOffsetY: 4, 
		stroke: 'green', strokeWidth: 2,
        text: "",
        data: 'M30,120 S350,60 399,147'
	});
  
  this.questionImage = new Kinetic.Image({ image: "", x: 40, y: 60, width: 260, height: 120 }); 
	
	// add objects to layer
	this.layer.add(this.firstTarget);		
	this.layer.add(this.secondTarget);
	this.layer.add(this.thirdTarget);
	
	this.layer.add(this.first);
	this.layer.add(this.second);
	this.layer.add(this.third);
	
  this.layer.add(this.questionImage);
	this.layer.add(this.question);

	

}


// index is current question
Answers.prototype.loadQuestion = function(index) {

	// previous question
	if(_pFlag === "image") { this.questionImage.setAttrs( { image: "" } ) }  //{ questionImage.destroy(); }
	else { this.question.setText(""); }
	
	if(quiz.questions[index].type == "text") {
		this.question.setText(quiz.questions[index].question);
	}
	else {		// image
		//this.loadImage(index);
    this.questionImage.setAttrs( { image: images[quiz.questions[index].question] } );
	}
	
	// load associated answer choices
	this.first.setText(quiz.questions[index].first);
	this.second.setText(quiz.questions[index].second);
	this.third.setText(quiz.questions[index].third);
	
	// set flag
	_pFlag = quiz.questions[index].type;
	
	this.layer.draw();

}

/*
Answers.prototype.loadImage = function(index) {

    var loadImage = new Image();
    loadImage.onload = function() {
        questionImage = new Kinetic.Image({
            image: loadImage,
            x: 40, y: 60, width: 260, height: 120
        }); 
		_App.answers.addImage(questionImage);
    };
    
    loadImage.src = quiz.questions[index].question;

}
*/

/*
 * divide screen into 3 vertical columns to 
 * quickly test the general direction of object's path
*/
Answers.prototype.isNearTarget = function(object) {

	var ax = object.attrs.x, ay = object.attrs.y;
	
	// start checking once object enters the upper half of screen
	if(ay < 350) {

		var n = ((ax < 140) ? 0 : (ax > 260) ? 2 : 1);	// determine general direction

		if(ax > this.answers[n].x - 40 && ax < this.answers[n].x + 40 && ay > this.answers[n].y - 30 && ay < this.answers[n].y + 30) {
			// check to see if correct answer
			if(n == 0 && quiz.questions[_qId].answer == "first") {
				// Snap banana to grid
				object.attrs.x = this.answers[n].x, object.attrs.y = this.answers[n].y;
				return true;
			}
			else if(n == 1 && quiz.questions[_qId].answer == "second") {
				// Snap banana to grid
				object.attrs.x = this.answers[n].x, object.attrs.y = this.answers[n].y;
				return true;
			}
			else if(n == 2 && quiz.questions[_qId].answer == "third") {
				// Snap banana to grid
				object.attrs.x = this.answers[n].x, object.attrs.y = this.answers[n].y;
				return true;
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	
	} // if(ay < 350)
	
	else {
		return false;
	}

}
