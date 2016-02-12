// Filename: appModels.js
// Copyright AVCO Productions Ltd.
// Author: Daniel Jackson
// Date: 25th July 2015

define(function(require, exports, module, jquery) {

	var $ = require('jquery');

	function AppModels(appRf) {

		this.appRef = appRf;

		// CHAPTER
		this.chapterNumber = 1;

		// console.log("this.chapterNumber = " + this.chapterNumber);

		this.chapters = [];

		init(this);

	}


	function init(slfRf) {
    	var self = slfRf;

    	// console.log("init");

    	// GET CHAPTERS
    	$.ajax({
		    type: "GET",
		    url: "data/hc.xml",
		    dataType: "xml",
		    success: function (document){ parseChapters(document, self); }
		});
    }


    function parseChapters(document, slfRf){
    	var self = slfRf;

	    // console.log("parseChapters");

	    var rhsHtmlText = "";

    	$(document).find("chapter:first-child mediaTextItem textSection").each(function(){
    		rhsHtmlText += $(this).html();
    	});

    	var lhsMedia = $(document).find("chapter:first-child mediaTextItem mediaItem").html();
    	var lhsMediaMetadata = $(document).find("chapter:first-child mediaTextItem mediaMetadata").html();

    	console.log("lhsMediaMetadata");
    	console.log(lhsMediaMetadata);

    	$("#text-container").html(rhsHtmlText);

    	$("#media").html(lhsMedia);

    	$("#media-metadata-container").html(lhsMediaMetadata);

    	// console.log("contents = ");
    	// console.log(rhsHtmlText);

    	var i = 0;

    	$(document).find("chapter").each(function(){
    		var chapterData = {};

    		// Get Title
    		chapterData.chapterTitle = $(this).find("chapterTitle h3").html();

    		// Get All Media Elements
    		chapterData.mediaElements = [];

    		// Assign all data to chapters object
    		self.chapters[i] = chapterData;

    		i++;
    	});


    	// Load Start Data into Interface
    	self.appControllerRef.loadStartDataIntoInterface();


	}

	module.exports = AppModels;

  
});