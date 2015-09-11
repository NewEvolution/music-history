define(["exports", "module", "jquery"], function (exports, module, _jquery) {
  "use strict";

  module.exports = function () {
    var songObj = {};
    // Check for length to prevent failure on filter, since there is no title for filtering
    if ((0, _jquery)("#title").length !== 0) {
      songObj.title = (0, _jquery)("#title").val();
    }
    songObj.artist = (0, _jquery)("#artist").val();
    songObj.album = (0, _jquery)("#album").val();
    songObj.genre = [];
    var $genreChoosers = (0, _jquery)("input:checked");
    for (var i = 0; i < $genreChoosers.length; i++) {
      // For adding songs, get other genre name from text field if other radio button is checked
      if ((0, _jquery)($genreChoosers[i]).val() === "GetOther") {
        songObj.genre[songObj.genre.length] = (0, _jquery)("#otherGenre").val();
      } else {
        songObj.genre[songObj.genre.length] = (0, _jquery)($genreChoosers[i]).val();
      }
    }
    return songObj;
  };
});
//# sourceMappingURL=get-form-data.js.map
