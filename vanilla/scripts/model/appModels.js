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

		// MEDIA ELEMENT NUMBER
		this.mediaItemNumber = 1;

		// Chapters Array
		this.chapters = [];

		init(this);

	}


	function init(slfRf) {
    	var self = slfRf;

    	// GET CHAPTERS
    	$.ajax({
		    type: "GET",
		    url: "data/hpc.xml",
		    dataType: "xml",
		    success: function (document){ parseChapters(document, self); }
		});
    }


    function parseChapters(document, slfRf){
    	var self = slfRf;

    	/*****************************/
    	/* LOAD EACH CHAPTER DATA    */
    	/*****************************/

    	var i = 0;

    	$(document).find("chapter").each(function(){
    		var chapterData = {};

    		// Get Title
    		chapterData.chapterTitle = $(this).find("chapterTitle h3").html();
    		chapterData.chapterID = $(this).attr("chapterNumber");

    		// Get All Media Elements
    		chapterData.mediaElements = [];

    		j = 0;
    		$(this).children("mediaItem").each(function(){
    			chapterData.mediaElements[j] = {};
    			var mediaElement = {};
    			
    			chapterData.mediaElements[j].mediaData = $(this).find("mediaData").html();

    			chapterData.mediaElements[j].mediaMetadata = $(this).find("mediaMetadata").html();

    			j++;
    		});

    		// Get RHS Content
    		chapterData.rhsHtml = $(this).children("rhsColumn").html();

    		// Assign all data to chapters object
    		self.chapters[i] = chapterData;
    		i++;
    	});

    	// Load Start Data into Interface
    	self.appControllerRef.loadStartDataIntoInterface();


	}

	module.exports = AppModels;

  
});