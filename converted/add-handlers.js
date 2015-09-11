define(["exports", "module", "multiuse-functions", "hb-template", "add-songs", "jquery", "lodash"], function (exports, module, _multiuseFunctions, _hbTemplate, _addSongs, _jquery, _lodash) {
  "use strict";

  module.exports = function (uniqueArtists, uniqueAlbums, retrievedSongsArr, firebaseRef) {
    // Initially hidden so all its reveals look the same
    (0, _jquery)("#add-reset").slideUp();
    // Artist dropdown menu
    (0, _jquery)("#add_artist-dropdown").on("click", ".artist-dr-item", function (e) {
      if ((0, _jquery)("#add-reset").hasClass("full-transparent")) {
        _multiuseFunctions.elementReveal((0, _jquery)("#add-reset"));
      }
      var selectedArtist = this.name;
      (0, _jquery)("#artist").val(selectedArtist); // On choosing artist, set the album dropdown to their albums
      var artistAlbums = _lodash.chain(retrievedSongsArr).filter({ 'artist': selectedArtist }).uniq("album").pluck("album").value();
      (0, _jquery)("#add_album-dropdown").html(_hbTemplate.addDropdown({ album: artistAlbums }));
    });
    // Album dropdown menu
    (0, _jquery)("#add_album-dropdown").on("click", ".album-dr-item", function (e) {
      if ((0, _jquery)("#add-reset").hasClass("full-transparent")) {
        _multiuseFunctions.elementReveal((0, _jquery)("#add-reset"));
      }
      var selectedAlbum = this.name;
      (0, _jquery)("#album").val(selectedAlbum); // On choosing album, set the artist dropdown to only the album artist
      var albumArtist = _lodash.chain(retrievedSongsArr).filter({ 'album': selectedAlbum }).uniq("artist").pluck("artist").value();
      (0, _jquery)("#add_artist-dropdown").html(_hbTemplate.addDropdown({ artist: albumArtist }));
    });
    // Submit button
    (0, _jquery)("#add-submit").click(function (e) {
      e.preventDefault();
      (0, _addSongs)(firebaseRef);
      _multiuseFunctions.elementHide((0, _jquery)("#add-reset"));
    });
    // Reveal the reset button on any change to the form
    (0, _jquery)("#add-form").on("change", ".add-input", function (e) {
      if ((0, _jquery)("#add-reset").hasClass("full-transparent")) {
        _multiuseFunctions.elementReveal((0, _jquery)("#add-reset"));
      }
    });
    // Form reset button
    (0, _jquery)("#add-reset").click(function (e) {
      e.preventDefault();
      _multiuseFunctions.elementHide((0, _jquery)("#add-reset"));
      (0, _jquery)('#add-form').each(function () {
        this.reset();
      });
      (0, _jquery)("#add_artist-dropdown").html(_hbTemplate.addDropdown({ artist: uniqueArtists }));
      (0, _jquery)("#add_album-dropdown").html(_hbTemplate.addDropdown({ album: uniqueAlbums }));
    });
  };
});
//# sourceMappingURL=add-handlers.js.map
