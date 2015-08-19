define(function(require){
  var $ = require("jquery");
  var functionObj = {};
  functionObj.elementHide = function(elementToHide) {
    $(elementToHide).addClass("fade-out-anim").on("animationend oAnimationEnd webkitAnimationEnd msAnimationEnd", function(e) {
      if(e.originalEvent.animationName === "fadeout") {
        $(this).addClass("full-transparent");
        $(this).removeClass("fade-out-anim");
        $(this).slideUp();
      }
    });
  };
  functionObj.elementReveal = function(elementToReveal) {
    $(elementToReveal).slideDown();
    $(elementToReveal).addClass("fade-in-anim").on("animationend oAnimationEnd webkitAnimationEnd msAnimationEnd", function(e) {
      if(e.originalEvent.animationName === "fadein") {
        $(this).removeClass("full-transparent");
        $(this).removeClass("fade-in-anim");
      }
    });
  };
  functionObj.getClickedSong = function(clickedElement) {
    var clickedSongObj = {};
    var clickedSongKey = $(clickedElement).parents(".song-section").attr("key");
    clickedSongObj.title = $(clickedElement).parents(".song-section").find("h1").html();
    clickedSongObj.artist = $(clickedElement).parents(".song-section").find(".artist-label em").html();
    clickedSongObj.album = $(clickedElement).parents(".song-section").find(".album-label em").html();
    clickedSongObj.genre = $(clickedElement).parents(".song-section").find(".genre-label em").html();
    return [clickedSongKey, clickedSongObj];
  };
  return functionObj;
});