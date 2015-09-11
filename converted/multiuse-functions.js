define(["exports", "module", "jquery"], function (exports, module, _jquery) {
  "use strict";

  module.exports = {
    elementHide: function elementHide(elementToHide) {
      (0, _jquery)(elementToHide).addClass("fade-out-anim").on("animationend oAnimationEnd webkitAnimationEnd msAnimationEnd", function (e) {
        if (e.originalEvent.animationName === "fadeout") {
          (0, _jquery)(this).addClass("full-transparent");
          (0, _jquery)(this).removeClass("fade-out-anim");
          (0, _jquery)(this).slideUp();
        }
      });
    },
    elementReveal: function elementReveal(elementToReveal) {
      (0, _jquery)(elementToReveal).slideDown();
      (0, _jquery)(elementToReveal).addClass("fade-in-anim").on("animationend oAnimationEnd webkitAnimationEnd msAnimationEnd", function (e) {
        if (e.originalEvent.animationName === "fadein") {
          (0, _jquery)(this).removeClass("full-transparent");
          (0, _jquery)(this).removeClass("fade-in-anim");
        }
      });
    },
    getClickedSong: function getClickedSong(clickedElement) {
      var clickedSongObj = {};
      var $clickedParent = (0, _jquery)(clickedElement).parents(".song-section");
      var clickedSongKey = $clickedParent.attr("key");
      clickedSongObj.title = $clickedParent.find("h1").html();
      clickedSongObj.artist = $clickedParent.find(".artist-label em").html();
      clickedSongObj.album = $clickedParent.find(".album-label em").html();
      clickedSongObj.genre = $clickedParent.find(".genre-label em").html();
      return [clickedSongKey, clickedSongObj];
    }
  };
});
//# sourceMappingURL=multiuse-functions.js.map
