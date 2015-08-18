define(["jquery", "lodash", "q", "hb-template", "multiuse-functions"], function($, _, Q, template, mf){
  var deferred = Q.defer();
  return {
    thePromise: deferred.promise,
    populatePage: function(sentSongsObj, currentPage) { // Populates the song list and form elements on initial page load
      var retrievedSongsArr = [];
      for(var key in sentSongsObj) {
        retrievedSongsArr[retrievedSongsArr.length] = sentSongsObj[key]; // Turn JSON object into array
      }

      var uniqueArtists = _.chain(retrievedSongsArr).uniq("artist").pluck("artist").value();
      $("#artist").html(template.addSelect({item:uniqueArtists}));
      $("#add_artist-dropdown").html(template.addDropdown({artist:uniqueArtists}));

      var uniqueAlbums = _.chain(retrievedSongsArr).uniq("album").pluck("album").value();
      $("#album").html(template.addSelect({item:uniqueAlbums}));
      $("#add_album-dropdown").html(template.addDropdown({album:uniqueAlbums}));

      // Start genre setter block ===============================================================
      var uniqueGenres = _.chain(retrievedSongsArr).uniq("genre").pluck("genre").value();
      $("#genre").html(""); // Wipe the genre check/radio section on change so that it doesn't pile new on old
      var addonOtherField = false;
      if(uniqueGenres.length === 0) {
        addonOtherField = true;
      }
      while(uniqueGenres.length) {
        var genrePairArr = uniqueGenres.splice(0,2);
        if(currentPage === "index.html" || currentPage === "") { // Checkboxes if it's on index.html
          $("#genre").append(template.genreCheck({genre:genrePairArr}));
        } else if (currentPage === "add.html") { // Radio buttons if it's on add.html
          if(genrePairArr.length === 2) { // 2 by 2 for pairs of genres
            $("#genre").append(template.genreRadio({genre:genrePairArr}));
            addonOtherField = true;
          } else { // One-up for single dangling genres + other field
            $("#genre").append(template.genreRadioSingle({genre:genrePairArr}));
            addonOtherField = false;
          }
        }
      }
      if(addonOtherField && currentPage === "add.html") { // Add the full-width other field if extant genres are even
        $("#genre").append(template.genreRadioOther);
      }
      // End genre setter block =================================================================
      $(".content").html(template.songs(sentSongsObj));
      $("section").each(function() { // Fade in all the song displays
        mf.elementReveal(this);
      });
      deferred.resolve(retrievedSongsArr, uniqueArtists, uniqueAlbums);
    }
  };
});