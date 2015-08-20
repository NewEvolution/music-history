define(function(require) {
  var $ = require("jquery");
  var mf = require("multiuse-functions");
  var searchQuery;
  var songsFilter = function(searchQuery) {
    var sectionsToHide = [];
    if(searchQuery.artist !== "all") {
      $("section .artist-label em").each(function(e) {
        if($(this).html() !== searchQuery.artist) {
          sectionsToHide[sectionsToHide.length] = $(this).parents(".song-section");
        }
      });
    }
    if(searchQuery.album !== "all") {
      $("section .album-label em").each(function(e) {
        if($(this).html() !== searchQuery.album) {
          sectionsToHide[sectionsToHide.length] = $(this).parents(".song-section");
        }
      });
    }
    if(searchQuery.genre.length !== 0) {
      $("section .genre-label em").each(function(e) {
        if(_.indexOf(searchQuery.genre, $(this).html()) === -1) {
          sectionsToHide[sectionsToHide.length] = $(this).parents(".song-section");
        }
      });
    }
  };
  $("#search-btn").click(function() {
     searchQuery= $("#search").val();
     songsFilter(searchQuery);
  });
});