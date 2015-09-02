import * as mf from "es6!multiuse-functions";
import * as template from "es6!hb-template";
import * as addSongs from "es6!add-songs";
import * as $ from "jquery";
import * as _ from "lodash";
export default function(uniqueArtists, uniqueAlbums, retrievedSongsArr, firebaseRef) {
  // Initially hidden so all its reveals look the same
  $("#add-reset").slideUp();
  // Artist dropdown menu
  $("#add_artist-dropdown").on("click", ".artist-dr-item", function(e) {
    if($("#add-reset").hasClass("full-transparent")) {
      mf.elementReveal($("#add-reset"));
    }
    let selectedArtist = this.name;
    $("#artist").val(selectedArtist); // On choosing artist, set the album dropdown to their albums
    let artistAlbums = _.chain(retrievedSongsArr).filter({'artist': selectedArtist}).uniq("album").pluck("album").value();
    $("#add_album-dropdown").html(template.addDropdown({album:artistAlbums}));
  });
  // Album dropdown menu
  $("#add_album-dropdown").on("click", ".album-dr-item", function(e) {
    if($("#add-reset").hasClass("full-transparent")) {
      mf.elementReveal($("#add-reset"));
    }
    let selectedAlbum = this.name;
    $("#album").val(selectedAlbum); // On choosing album, set the artist dropdown to only the album artist
    let albumArtist = _.chain(retrievedSongsArr).filter({'album': selectedAlbum}).uniq("artist").pluck("artist").value();
    $("#add_artist-dropdown").html(template.addDropdown({artist:albumArtist}));
  });
  // Submit button
  $("#add-submit").click(function(e) {
    e.preventDefault();
    addSongs(firebaseRef);
    mf.elementHide($("#add-reset"));
  });
  // Reveal the reset button on any change to the form
  $("#add-form").on("change", ".add-input", function(e) {
    if($("#add-reset").hasClass("full-transparent")) {
      mf.elementReveal($("#add-reset"));
    }
  });
  // Form reset button
  $("#add-reset").click(function(e) {
    e.preventDefault();
    mf.elementHide($("#add-reset"));
    $('#add-form').each(function() {
      this.reset();
    });
    $("#add_artist-dropdown").html(template.addDropdown({artist:uniqueArtists}));
    $("#add_album-dropdown").html(template.addDropdown({album:uniqueAlbums}));
  });
}