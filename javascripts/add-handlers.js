define(function(require){
  var $ = require("jquery");
  var _ = require("lodash");
  var addSongs = require("add-songs");
  var template = require("es6!hb-template");
  var mf = require("multiuse-functions");
  return function(uniqueArtists, uniqueAlbums, retrievedSongsArr, firebaseRef) {
    // Initially hidden so all its reveals look the same
    $("#add-reset").slideUp();
    // Artist dropdown menu
    $("#add_artist-dropdown").on("click", ".artist-dr-item", function(e) {
      if($("#add-reset").hasClass("full-transparent")) {
        mf.elementReveal($("#add-reset"));
      }
      var selectedArtist = this.name;
      $("#artist").val(selectedArtist); // On choosing artist, set the album dropdown to their albums
      var artistAlbums = _.chain(retrievedSongsArr).filter({'artist': selectedArtist}).uniq("album").pluck("album").value();
      $("#add_album-dropdown").html(template.addDropdown({album:artistAlbums}));
    });
    // Album dropdown menu
    $("#add_album-dropdown").on("click", ".album-dr-item", function(e) {
      if($("#add-reset").hasClass("full-transparent")) {
        mf.elementReveal($("#add-reset"));
      }
      var selectedAlbum = this.name;
      $("#album").val(selectedAlbum); // On choosing album, set the artist dropdown to only the album artist
      var albumArtist = _.chain(retrievedSongsArr).filter({'album': selectedAlbum}).uniq("artist").pluck("artist").value();
      $("#add_artist-dropdown").html(template.addDropdown({artist:albumArtist}));
    });
    // Submit button
    $("#add-submit").click(function(e) {
      e.preventDefault();
      addSongs.songSubmit(firebaseRef);
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
  };
});