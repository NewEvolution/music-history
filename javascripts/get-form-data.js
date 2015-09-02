define(function(require){
  var $ = require("jquery");
  return function() {
    var songObj = {};
    // Check for length to prevent failure on filter, since there is no title for filtering
    if($("#title").length !== 0) {
      songObj.title = $("#title").val();
    }
    songObj.artist = $("#artist").val();
    songObj.album = $("#album").val();
    songObj.genre = [];
    $genreChoosers = $("input:checked");
    for(var i=0; i<$genreChoosers.length; i++) {
      // For adding songs, get other genre name from text field if other radio button is checked
      if($($genreChoosers[i]).val() === "GetOther") {
        songObj.genre[songObj.genre.length] = $("#otherGenre").val();
      } else {
        songObj.genre[songObj.genre.length] = $($genreChoosers[i]).val();
      }
    }
    return songObj;
  };
});