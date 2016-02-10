// Filename: appModels.js
// Copyright AVCO Productions Ltd.
// Author: Daniel Jackson
// Date: 25th July 2015

define(function(require, exports, module, jquery) {

	var $ = require('jquery');

	function AppModels() {


		// CHAPTER
		this.chapterNumber = 1;

		console.log("this.chapterNumber = " + this.chapterNumber);


		init(this);

	}


	function init(slfRf) {
    	var self = slfRf;

    	console.log("init");

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

	    console.log("parseChapters");

	    var rhsHtmlText = "";

    	$(document).find("chapter:first-child mediaTextItem textSection").each(function(){
    		rhsHtmlText += $(this).html();
    	});

    	var lhsMedia = $(document).find("chapter:first-child mediaTextItem mediaItem").html();

    	$("#text-container").html(rhsHtmlText);

    	$("#media-container").html(lhsMedia);

    	console.log("contents = ");
    	console.log(rhsHtmlText);


	}

	module.exports = AppModels;

  
});