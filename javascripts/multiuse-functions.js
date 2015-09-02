import * as $ from "jquery";
export default {
  elementHide: elementToHide => {
    $(elementToHide).addClass("fade-out-anim").on("animationend oAnimationEnd webkitAnimationEnd msAnimationEnd", e => {
      if(e.originalEvent.animationName === "fadeout") {
        $(this).addClass("full-transparent");
        $(this).removeClass("fade-out-anim");
        $(this).slideUp();
      }
    });
  },
  elementReveal: elementToReveal => {
    $(elementToReveal).slideDown();
    $(elementToReveal).addClass("fade-in-anim").on("animationend oAnimationEnd webkitAnimationEnd msAnimationEnd", e => {
      if(e.originalEvent.animationName === "fadein") {
        $(this).removeClass("full-transparent");
        $(this).removeClass("fade-in-anim");
      }
    });
  },
  getClickedSong: clickedElement => {
    let clickedSongObj = {};
    let $clickedParent = $(clickedElement).parents(".song-section");
    let clickedSongKey = $clickedParent.attr("key");
    clickedSongObj.title = $clickedParent.find("h1").html();
    clickedSongObj.artist = $clickedParent.find(".artist-label em").html();
    clickedSongObj.album = $clickedParent.find(".album-label em").html();
    clickedSongObj.genre = $clickedParent.find(".genre-label em").html();
    return [clickedSongKey, clickedSongObj];
  }
};