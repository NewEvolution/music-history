import * as formData from "get-form-data";
import * as $ from "jquery";
import * as _ from "lodash";
export default () => {
  let sectionsToHide = [];
  let selectedObj = formData();
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