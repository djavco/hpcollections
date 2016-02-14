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
          $("#media").slideToggle("slow");
      });
    });



  }

  AppController.prototype.loadStartDataIntoInterface = function() {
    var self = this;


    /* DROP DOWN MENU START */

    // Create Html for dropdown Chapter Menu
    console.log("self.modelsRef.chapters.length = " + self.modelsRef.chapters.length);

    for(var i=0; i < self.modelsRef.chapters.length; i++)
    {
      var chapterLi = "<li><a href='#'>" + this.modelsRef.chapters[i].chapterTitle + "</a></li>";

      console.log("chapterLi = " + chapterLi);
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

    /* DROP DOWN MENU END */



  }
  

  module.exports = AppController;

  
});