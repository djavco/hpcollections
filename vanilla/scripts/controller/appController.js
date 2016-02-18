// Filename: appModels.js
// Copyright AVCO Productions Ltd.
// Author: Daniel Jackson
// Date: 25th July 2015

define(function(require, exports, module, jquery, jqueryui) {

  var $ = require('jquery');
  var jUI = require('jqueryui');

  // Modules

  function AppController(mdlsRef, vwRef) {

    var self = this;

    this.modelsRef = mdlsRef;
    this.viewRef = vwRef;

    init(self);

  }

  function init(slfRf) {
    var self = slfRf;

    // Toggle Meida and Metadata Display
    $(function(){
      $("#metadata-toggle").click(function () {
          $("#media-metadata-container").slideToggle("slow");
          $("#mediaData").slideToggle("slow");
      });
    });


    // Chapter Menu Functionality

  }

  AppController.prototype.loadStartDataIntoInterface = function() {
    var self = this;

    /************************/
    /* DROP DOWN MENU START */
    /************************/
    // Create Html for dropdown Chapter Menu
    for(var i=0; i < self.modelsRef.chapters.length; i++)
    {
      var chapterLi = "<li><a href='#' data-chapter-id='" + this.modelsRef.chapters[i].chapterID +"'>" + this.modelsRef.chapters[i].shortChapterTitle + "</a></li>";

      $("#chapter-menu li.main-menu ul").append(chapterLi);
    }

    // Add DropDown Functionality
    $('#chapter-menu li').hover(
        function () {
            //show its submenu
            $('ul', this).stop().slideDown(200);

        }, 
        function () {
            //hide its submenu
            $('ul', this).stop().slideUp(250);            
        }
    );

    $('#chapter-menu li.main-menu ul li').click(function() {
      // Get Chapter Number clicked
      var chapterID = $(this).children("a").attr("data-chapter-id");

      // Load Chapter Data
      loadChapterData(self, chapterID);
    });


    /******************/
    /* PREVIOUS NEXT  */
    /******************/
    // NEXT
    $('#nav-next a').click(function() {
      if(self.modelsRef.chapterNumber < self.modelsRef.chapters.length)
      {
        self.modelsRef.chapterNumber += 1;

        // Load Chapter Data
        loadChapterData(self, self.modelsRef.chapterNumber);
      }
    });

    // PREVIOUS
    $('#nav-previous a').click(function() {

      if(self.modelsRef.chapterNumber > 1)
      {
        self.modelsRef.chapterNumber -= 1;

        // Load Chapter Data
        loadChapterData(self, self.modelsRef.chapterNumber);
      }
    });

    loadChapterData(self, 1)

  }
  
  function updateLHSMedia(slfRf, mdItmNo)
  {
    var self = slfRf

    self.modelsRef.mediaItemNumber = mdItmNo;

    var mediaIndex = mdItmNo - 1;
    var chapterIndex = self.modelsRef.chapterNumber - 1;

    // MEDIA DATA
    $("#mediaData").html(self.modelsRef.chapters[chapterIndex].mediaElements[mediaIndex].mediaData);

    $("#mediaData img").load(function(){
      console.log($(this).width() + "x" + $(this).height());

      var availableHeight = $('#mediaData').height() - $('#mediaData p.caption').height() - $('#metadata-toggle').height();

      if($(this).height() > availableHeight)
      {
        var newWidth = Math.floor(($(this).width()/$(this).height()) * availableHeight);

        $("#mediaData img").css("width", "auto");
        $("#mediaData img").attr("width", newWidth);
        $("#mediaData img").attr("height", availableHeight);
      }
    });


    // MEDIA METADATA
    $("#media-metadata-container").html(self.modelsRef.chapters[chapterIndex].mediaElements[mediaIndex].mediaMetadata);

  }

  function loadChapterData(slfRf, chptrID)
  {
    var self = slfRf;

    var chapterIndex = parseInt(chptrID) - 1;

    $("#chapter-title h2").html(self.modelsRef.chapters[chapterIndex].chapterTitle);

    // $("#chapter-title h2").html(self.modelsRef.chapters[chapterIndex].chapterTitle);

    /**************************/
    /* UPDATE CHAPTER NUMBER  */
    /**************************/
    self.modelsRef.chapterNumber = parseInt(chptrID);


    /***********************/
    /* FIRST CHAPTER TITLE */
    /***********************/
    $("#chapter-title h2").html(self.modelsRef.chapters[chapterIndex].chapterTitle);


    /************************/
    /* LOAD LHS MEDIA DATA  */
    /************************/
    $("#mediaData").html(self.modelsRef.chapters[chapterIndex].mediaElements[0].mediaData);


    $("#mediaData img").load(function(){
      console.log($(this).width() + "x" + $(this).height());

      var availableHeight = $('#mediaData').height() - $('#mediaData p.caption').height() - $('#metadata-toggle').height();

      if($(this).height() > availableHeight)
      {
        var newWidth = Math.floor(($(this).width()/$(this).height()) * availableHeight);

        $("#mediaData img").css("width", "auto");
        $("#mediaData img").attr("width", newWidth);
        $("#mediaData img").attr("height", availableHeight);
      }
    });



    // if($("#mediaData img").height() > $("#mediaData").height())
    // {
    //   console.log("Image is too big");
    // }

    $("#media-metadata-container").html(self.modelsRef.chapters[chapterIndex].mediaElements[0].mediaMetadata);

    /*****************/
    /* LOAD RHS HTML */
    /*****************/
    $("#rhs-html-container").html(self.modelsRef.chapters[chapterIndex].rhsHtml);


    /***********************************/
    /* UPDATE PREVIOUS NEXT VISIBILITY */
    /***********************************/
    // Previous
    if(self.modelsRef.chapterNumber == 1)
    {
      $('#nav-previous').css("display", "none");
    }
    if(self.modelsRef.chapterNumber > 1)
    {
      $('#nav-previous').css("display", "inline");
    }

    // Next
    if(self.modelsRef.chapterNumber == self.modelsRef.chapters.length)
    {
      $('#nav-next').css("display", "none");
    }
    if(self.modelsRef.chapterNumber < self.modelsRef.chapters.length)
    {
      $('#nav-next').css("display", "inline");
    }

    /***********************/
    /* MEDIA UPDATE LINKS  */
    /***********************/
    $('span.update-lhs-link').click(function() {

      var mediaItemNo = $(this).attr("data-lhs-link-id");

      // Remove Highlights
      $('#rhs-html-container p').removeClass('active');

      // Update LHS Media
      updateLHSMedia(self, mediaItemNo);

      // Add Highlight Current to current paragraph
      $(this).parent('p').addClass('active');
    });
  }

  module.exports = AppController;

});