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



  }

  AppController.prototype.loadStartDataIntoInterface = function() {
    var self = this;

    /************************/
    /* DROP DOWN MENU START */
    /************************/
    // Create Html for dropdown Chapter Menu
    for(var i=0; i < self.modelsRef.chapters.length; i++)
    {
      var chapterLi = "<li><a href='#'>" + this.modelsRef.chapters[i].chapterTitle + "</a></li>";

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

  }
  

  module.exports = AppController;

  
});