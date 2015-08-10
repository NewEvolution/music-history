define(["jquery", "get-form-data"], function($, formData){
  return {
    songsFilter: function() {
      var sectionsToHide = [];
      var selectedObj = formData.pullData();
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
          for(var i=0; i<selectedObj.genre.length; i++) {
            if($(this).html() !== selectedObj.genre[i]) {
              sectionsToHide[sectionsToHide.length] = $(this).parents(".song-section");
            }
          }
        });
      }
    return sectionsToHide;
    }
  };
});