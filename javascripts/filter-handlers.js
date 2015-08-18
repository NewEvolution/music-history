define(["jquery", "multiuse-functions", "hb-template", "filter-songs"], function($, mf, template, filterSongs){
  return {
    handlers: function(retrievedSongsArr) {
      $("#artist").change(function(e) {
        var selectedArtist = $(this).val();
        if(selectedArtist === "all") { // Reset album list to show all albums
          $("#album").html(template.addSelect({item:uniqueAlbums}));
        } else { // Populate the album select with only the chosen artists albums
          var artistAlbums = _.chain(retrievedSongsArr).filter({'artist': selectedArtist}).uniq("album").pluck("album").value();
          $("#album").html(template.addSelect({item:artistAlbums}));
        }
      });

      $("#album").change(function(e) {
        var selectedAlbum = $(this).val();
        if(selectedAlbum === "all") { // Reset artist list to show all artists
          $("#artist").html(template.addSelect({item:uniqueArtists}));
        }
      });

      $("#filter-submit").click(function(e) {
        e.preventDefault();
        if($("#filter-reset").hasClass("full-transparent") === false) {
          var sectionsToHide = filterSongs.songsFilter();
          for(var i=0; i<sectionsToHide.length; i++) {
            mf.elementHide(sectionsToHide[i]);
          }
        }
      });

      $("#filter-reset").slideUp(); // Initially hidden so all its reveals look the same

      $("#filter-form").on( "change", ".filter-input", function(e) { // Reveal the reset buton when any form field changes
        if($("#filter-reset").hasClass("full-transparent")) {
          mf.elementReveal($("#filter-reset"));
        }
      });

      $("#filter-reset").click(function(e) {
        e.preventDefault();
        mf.elementHide($("#filter-reset"));
        var allHiddenSongs = $("section.row.full-transparent");
        for(var i=0; i<allHiddenSongs.length; i++) {
          mf.elementReveal(allHiddenSongs[i]);
        }
        $('#filter-form').each(function() {
          this.reset();
        });
        $("#artist").html(template.addSelect({item:uniqueArtists}));
        $("#album").html(template.addSelect({item:uniqueAlbums}));
      });
    }
  };
});