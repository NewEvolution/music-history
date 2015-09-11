define(["exports", "module", "filter-songs", "hb-template", "multiuse-functions", "jquery"], function (exports, module, _filterSongs, _hbTemplate, _multiuseFunctions, _jquery) {
  "use strict";

  module.exports = function (uniqueArtists, uniqueAlbums, retrievedSongsArr) {
    // Initially hidden so all its reveals look the same
    (0, _jquery)("#filter-reset").slideUp();
    // Artist dropdown menu
    (0, _jquery)("#artist").change(function (e) {
      var selectedArtist = (0, _jquery)(this).val();
      if (selectedArtist === "all") {
        // Reset album list to show all albums
        (0, _jquery)("#album").html(_hbTemplate.addSelect({ item: uniqueAlbums }));
      } else {
        // Populate the album select with only the chosen artists albums
        var artistAlbums = _.chain(retrievedSongsArr).filter({ 'artist': selectedArtist }).uniq("album").pluck("album").value();
        (0, _jquery)("#album").html(_hbTemplate.addSelect({ item: artistAlbums }));
      }
    });
    // Album dropdown menu
    (0, _jquery)("#album").change(function (e) {
      var selectedAlbum = (0, _jquery)(this).val();
      if (selectedAlbum === "all") {
        // Reset artist list to show all artists
        (0, _jquery)("#artist").html(_hbTemplate.addSelect({ item: uniqueArtists }));
      }
    });
    // Submit button
    (0, _jquery)("#filter-submit").click(function (e) {
      e.preventDefault();
      if ((0, _jquery)("#filter-reset").hasClass("full-transparent") === false) {
        var sectionsToHide = (0, _filterSongs)();
        for (var i = 0; i < sectionsToHide.length; i++) {
          _multiuseFunctions.elementHide(sectionsToHide[i]);
        }
      }
    });
    // Reveal the reset buton when any form field changes
    (0, _jquery)("#filter-form").on("change", ".filter-input", function (e) {
      if ((0, _jquery)("#filter-reset").hasClass("full-transparent")) {
        _multiuseFunctions.elementReveal((0, _jquery)("#filter-reset"));
      }
    });
    // Reset Button
    (0, _jquery)("#filter-reset").click(function (e) {
      e.preventDefault();
      _multiuseFunctions.elementHide((0, _jquery)("#filter-reset"));
      var allHiddenSongs = (0, _jquery)("section.row.full-transparent");
      for (var i = 0; i < allHiddenSongs.length; i++) {
        _multiuseFunctions.elementReveal(allHiddenSongs[i]);
      }
      (0, _jquery)('#filter-form').each(function () {
        this.reset();
      });
      (0, _jquery)("#artist").html(_hbTemplate.addSelect({ item: uniqueArtists }));
      (0, _jquery)("#album").html(_hbTemplate.addSelect({ item: uniqueAlbums }));
    });
  };
});
//# sourceMappingURL=filter-handlers.js.map
