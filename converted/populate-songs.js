define(["exports", "module", "hb-template", "multiuse-functions", "jquery", "lodash"], function (exports, module, _hbTemplate, _multiuseFunctions, _jquery, _lodash) {
  "use strict";

  module.exports = function (sentSongsObj, currentPage, thePromise) {
    // Populates the song list and form elements on initial page load
    var promisedObj = {};
    var retrievedSongsArr = [];
    for (var key in sentSongsObj) {
      retrievedSongsArr[retrievedSongsArr.length] = sentSongsObj[key]; // Turn JSON object into array
    }

    var uniqueArtists = _lodash.chain(retrievedSongsArr).uniq("artist").pluck("artist").value();
    (0, _jquery)("#artist").html(_hbTemplate.addSelect({ item: uniqueArtists }));
    (0, _jquery)("#add_artist-dropdown").html(_hbTemplate.addDropdown({ artist: uniqueArtists }));

    var uniqueAlbums = _lodash.chain(retrievedSongsArr).uniq("album").pluck("album").value();
    (0, _jquery)("#album").html(_hbTemplate.addSelect({ item: uniqueAlbums }));
    (0, _jquery)("#add_album-dropdown").html(_hbTemplate.addDropdown({ album: uniqueAlbums }));

    // Start genre setter block ===============================================================
    var uniqueGenres = _lodash.chain(retrievedSongsArr).uniq("genre").pluck("genre").value();
    (0, _jquery)("#genre").html(""); // Wipe the genre check/radio section on change so that it doesn't pile new on old
    var addonOtherField = false;
    if (uniqueGenres.length === 0) {
      addonOtherField = true;
    }
    while (uniqueGenres.length) {
      var genrePairArr = uniqueGenres.splice(0, 2);
      if (currentPage === "index.html" || currentPage === "") {
        // Checkboxes if it's on index.html
        (0, _jquery)("#genre").append(_hbTemplate.genreCheck({ genre: genrePairArr }));
      } else if (currentPage === "add.html") {
        // Radio buttons if it's on add.html
        if (genrePairArr.length === 2) {
          // 2 by 2 for pairs of genres
          (0, _jquery)("#genre").append(_hbTemplate.genreRadio({ genre: genrePairArr }));
          addonOtherField = true;
        } else {
          // One-up for single dangling genres + other field
          (0, _jquery)("#genre").append(_hbTemplate.genreRadioSingle({ genre: genrePairArr }));
          addonOtherField = false;
        }
      }
    }
    if (addonOtherField && currentPage === "add.html") {
      // Add the full-width other field if extant genres are even
      (0, _jquery)("#genre").append(_hbTemplate.genreRadioOther);
    }
    // End genre setter block =================================================================
    (0, _jquery)(".content").html(_hbTemplate.songs(sentSongsObj));
    (0, _jquery)("section").each(function () {
      // Fade in all the song displays
      _multiuseFunctions.elementReveal(this);
    });
    promisedObj.u_artists = uniqueArtists;
    promisedObj.u_albums = uniqueAlbums;
    promisedObj.songs_a = retrievedSongsArr;
    thePromise.resolve(promisedObj);
  };
});
//# sourceMappingURL=populate-songs.js.map
