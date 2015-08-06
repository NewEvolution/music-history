define(["jquery"], function($){
  return {
    pullData: function() {
      var songObj = {};
      songObj.title = $("#title").val();
      songObj.artist = $("#artist").val();
      songObj.album = $("#album").val();
      songObj.genre = [];
      $genreChoosers = $("input:checked");
      for(var i=0; i<$genreChoosers.length; i++) {
        if($($genreChoosers[i]).val() === "GetOther") {
          songObj.genre[songObj.genre.length] = $("#genre").val();
        } else {
          songObj.genre[songObj.genre.length] = $($genreChoosers[i]).val();
        }
      }
      return {
        songObj
      };
    }
  };
});