/*
1.var myObject = {  
2.    iAm : 'an object',  
3.    whatAmI : function(){  
4.        alert('I am ' + this.iAm);  
5.    }  
6.}
useage:
myObject.whatAmI();
spliceDemo.play({
  from: 500, // start playing at 500 msec
  to: 1200,  // end at 1200 msec

*/


soundManager.setup({
  
  // location: path to SWF files, as needed (SWF file name is appended later.)

  url: 'sounds/',
  
  allowScriptAccess: 'always',
  
  // optional: version of SM2 flash audio API to use (8 or 9; default is 8 if omitted, OK for most use cases.)
  // flashVersion: 9,

  // optional: use 100% HTML5 mode where available
  preferFlash: false,

  // use soundmanager2-nodebug-jsmin.js, or disable debug mode (enabled by default) after development/testing
  debugMode: false,

  waitForWindowLoad: true,
  
  // good to go: the onready() callback

  onready: function() {

    // SM2 has started - now you can create and play sounds!

    soundManager.createSound({
      id: 'aSound',
      url: 'sounds/monkey_cry.mp3',
      autoLoad: true,
      volume: 50,
      onload: function() { console.log('SM2 loaded!', this); }
      // other options here..
    });


  },

  // optional: ontimeout() callback for handling start-up failure

  ontimeout: function() {

    // Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
	  console.log('Sound Manager could not start!');

  }

});

