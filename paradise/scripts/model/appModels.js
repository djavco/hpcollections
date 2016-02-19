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

        // Citation URL
        this.citationUrl = "http://hpc.dev/vanilla/";
        
        // Chapters Array
        this.chapters = [];
        this.referenceList = [];

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

        // GET REFERENCE LIST
        $.ajax({
            type: "GET",
            url: "data/reference-list.xml",
            dataType: "xml",
            success: function (document){ parseReferences(document, self); }
        });
    }

    function parseReferences(document, slfRf){
        var self = slfRf;

        /***********************/
        /* LOAD EACH REFERENCE */
        /***********************/
        var i = 0;

        $(document).find("reference").each(function() {

            self.referenceList[i] = $(this).html();

            i++;
        });

        console.log("References = ");
        console.log(self.referenceList);
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
            chapterData.shortChapterTitle = $(this).find("shortChapterTitle h3").html();
            chapterData.chapterID = $(this).attr("chapterNumber");

            // Get All Media Elements
            chapterData.mediaElements = [];

            j = 0;
            $(this).children("mediaItem").each(function(){
                chapterData.mediaElements[j] = {};
                var mediaElement = {};
                
                chapterData.mediaElements[j].mediaData = $(this).find("mediaData").html();

                var mediaMetaDataObject = {};
                mediaMetaDataObject.metadataHtml = $(this).find("mediaMetadata").html();
                mediaMetaDataObject.metadataStatus = $(this).find("mediaMetadata").attr("status");

                chapterData.mediaElements[j].mediaMetadata = mediaMetaDataObject;

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