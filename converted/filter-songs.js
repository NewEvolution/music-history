define(["exports", "module", "get-form-data", "jquery", "lodash"], function (exports, module, _getFormData, _jquery, _lodash) {
  "use strict";

  module.exports = function () {
    var sectionsToHide = [];
    var selectedObj = (0, _getFormData)();
    if (selectedObj.artist !== "all") {
      (0, _jquery)("section .artist-label em").each(function (e) {
        if ((0, _jquery)(this).html() !== selectedObj.artist) {
          sectionsToHide[sectionsToHide.length] = (0, _jquery)(this).parents(".song-section");
        }
      });
    }
    if (selectedObj.album !== "all") {
      (0, _jquery)("section .album-label em").each(function (e) {
        if ((0, _jquery)(this).html() !== selectedObj.album) {
          sectionsToHide[sectionsToHide.length] = (0, _jquery)(this).parents(".song-section");
        }
      });
    }
    if (selectedObj.genre.length !== 0) {
      (0, _jquery)("section .genre-label em").each(function (e) {
        if (_lodash.indexOf(selectedObj.genre, (0, _jquery)(this).html()) === -1) {
          sectionsToHide[sectionsToHide.length] = (0, _jquery)(this).parents(".song-section");
        }
      });
    }
    return sectionsToHide;
  };
});
//# sourceMappingURL=filter-songs.js.map
