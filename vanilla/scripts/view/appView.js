// Filename: appView.js
// Copyright AVCO Productions Ltd.
// Author: Daniel Jackson
// Date: 25th July 2015

define(function(require, exports, module, jquery) {
  
  	var $ = require('jquery');

	function AppView(mdlsRef) {
    var self = this;

    this.modelsRef = mdlsRef;


    this.drawProgressBar();
  }

  AppView.prototype.drawProgressBar = function() {

  	var canvas = document.getElementById("progress-bar");
	var ctx = canvas.getContext("2d");

	var numberchapters = this.modelsRef.chapters.length;

	console.log("numberchapters = " + numberchapters);

	canvas.width = $("#chapter-navigation-lhs").width();
	canvas.height = 30;

	var barWidth = canvas.width;
	var barHeight = canvas.height;

	var barDivision = Math.floor(barWidth/numberchapters);

	var barPosition = barDivision + 0.5;

	// Highlight Current Chapter
	ctx.fillStyle="#FFEEEE";
	ctx.fillRect(0,0,barPosition,barHeight);

	// Vertical Chapter Divisions
	

	for(var i=0; i < numberchapters-1; i++)
	{
		ctx.strokeStyle="#FF0000";
		ctx.lineWidth=1;

		ctx.moveTo(barPosition,0);
		ctx.lineTo(barPosition,barHeight);

		ctx.stroke();

		// Strokes for each mediaItem
		var numMediaItems = this.modelsRef.chapters[i].mediaElements.length;
		var mediaDivision = Math.floor(barDivision/numMediaItems);
		var mediaBarPosition = barDivision + mediaDivision + 0.5;

		for(var j=0; j < numMediaItems-1; j++)
		{
			ctx.strokeStyle="#FFFF00";
			ctx.lineWidth=1;

			ctx.moveTo(mediaBarPosition,0);
			ctx.lineTo(mediaBarPosition,barHeight);

			mediaBarPosition += mediaDivision;
		}
	
		barPosition += barDivision;
	}

	
  }

  module.exports = AppView;

  
});