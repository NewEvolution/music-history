define(function(require){
  var formData = require("get-form-data");
  var $ = require("jquery");
  var _ = require("lodash");
  return function() {
    var sectionsToHide = [];
    var selectedObj = formData();
    if(selectedObj.artist !== "all") {
      $("section .artist-label em").each(function(e) {
        if($(this).html() !== selectedObj.artist) {
          sectionsToHide[sectionsToHide.length] = $(this).parents(".song-section");
        }
      });
    }
    if(selectedObj.album !== "all") {
      $("section .album-label em").each(function(e) {
        if($(this).html() !== selectedObj.album) {
          sectionsToHide[sectionsToHide.length] = $(this).parents(".song-section");
        }
      });
    }
    if(selectedObj.genre.length !== 0) {
      $("section .genre-label em").each(function(e) {
        if(_.indexOf(selectedObj.genre, $(this).html()) === -1) {
          sectionsToHide[sectionsToHide.length] = $(this).parents(".song-section");
        }
      });
    }
  return sectionsToHide;
  };
});