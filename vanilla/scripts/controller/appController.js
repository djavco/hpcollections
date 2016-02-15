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
      var chapterLi = "<li><a href='#' data-chapter-id='" + this.modelsRef.chapters[i].chapterID +"'>" + this.modelsRef.chapters[i].chapterTitle + "</a></li>";

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
      // console.log("Chapter title clicked");

      // console.log("myID = ");
      // console.log($(this).children("a").attr("data-chapter-id"));

      // Get Chapter Number clicked
      var chapterID = $(this).children("a").attr("data-chapter-id");

      // Load Chapter Data
      loadChapterData(self, chapterID);
    });
    /************************/
    /* END DROP DOWN MENU ***/
    /************************/



    /************************/
    /* LOAD LHS MEDIA DATA  */
    /************************/
    $("#mediaData").html(this.modelsRef.chapters[0].mediaElements[0].mediaData);

    $("#media-metadata-container").html(this.modelsRef.chapters[0].mediaElements[0].mediaMetadata);
    /****************************/
    /* END LOAD LHS MEDIA DATA  */
    /****************************/



    /*****************/
    /* LOAD RHS HTML */
    /*****************/
    $("#rhs-html-container").html(this.modelsRef.chapters[0].rhsHtml);

    /**********************/
    /* END LOAD RHS HTML  */
    /**********************/


    /***********************/
    /* PREVIOUS NEXT START */
    /***********************/

    // NEXT
    $('#nav-next a').click(function() {
      console.log("Next Clicked");

      if(self.modelsRef.chapterNumber < self.modelsRef.chapters.length)
      {
        self.modelsRef.chapterNumber += 1;

        // Load Chapter Data
        loadChapterData(self, self.modelsRef.chapterNumber);
      }

      if(self.modelsRef.chapterNumber > 1)
      {
        $('#nav-previous').css("display", "inline");
      }

      if(self.modelsRef.chapterNumber == self.modelsRef.chapters.length)
      {
        $('#nav-next').css("display", "none");
      }

    });

    // PREVIOUS
    $('#nav-previous a').click(function() {
      console.log("Previous Clicked");

      if(self.modelsRef.chapterNumber > 1)
      {
        self.modelsRef.chapterNumber -= 1;

        // Load Chapter Data
        loadChapterData(self, self.modelsRef.chapterNumber);
      }

      if(self.modelsRef.chapterNumber < self.modelsRef.chapters.length)
      {
        $('#nav-next').css("display", "inline");
      }

      if(self.modelsRef.chapterNumber == 1)
      {
        $('#nav-previous').css("display", "none");
      }

    });
    /*********************/
    /* PREVIOUS NEXT END */
    /*********************/
  }
  
  function loadChapterData(slfRf, chptrID)
  {
    var self = slfRf;

    var chapterIndex = chptrID - 1;

    console.log("loadChapterData");
    console.log(self.modelsRef.chapters[chapterIndex].mediaElements[0].mediaData);

    /************************/
    /* LOAD LHS MEDIA DATA  */
    /************************/
    $("#mediaData").html(self.modelsRef.chapters[chapterIndex].mediaElements[0].mediaData);

    $("#media-metadata-container").html(self.modelsRef.chapters[chapterIndex].mediaElements[0].mediaMetadata);
    /****************************/
    /* END LOAD LHS MEDIA DATA  */
    /****************************/



    /*****************/
    /* LOAD RHS HTML */
    /*****************/
    $("#rhs-html-container").html(self.modelsRef.chapters[chapterIndex].rhsHtml);

    /**********************/
    /* END LOAD RHS HTML  */
    /**********************/
  }

  module.exports = AppController;

  
});