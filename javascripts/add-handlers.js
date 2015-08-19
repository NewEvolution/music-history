define(["jquery", "lodash", "multiuse-functions", "hb-template", "add-songs"], function($, _, mf, template, addSongs){
  return {
    handlers: function(uniqueArtists, uniqueAlbums, retrievedSongsArr) {
      $("#add_artist-dropdown").on("click", ".artist-dr-item", function(e) {
        if($("#add-reset").hasClass("full-transparent")) {
          mf.elementReveal($("#add-reset"));
        }
        var selectedArtist = this.name;
        $("#artist").val(selectedArtist);
        var artistAlbums = _.chain(retrievedSongsArr).filter({'artist': selectedArtist}).uniq("album").pluck("album").value();
        $("#add_album-dropdown").html(template.addDropdown({album:artistAlbums}));
      });
      
      $("#add_album-dropdown").on("click", ".album-dr-item", function(e) {
        if($("#add-reset").hasClass("full-transparent")) {
          mf.elementReveal($("#add-reset"));
        }
        var selectedAlbum = this.name;
        $("#album").val(selectedAlbum);
        var albumArtist = _.chain(retrievedSongsArr).filter({'album': selectedAlbum}).uniq("artist").pluck("artist").value();
        $("#add_artist-dropdown").html(template.addDropdown({artist:albumArtist}));
      });

      $("#add-submit").click(function(e) {
        e.preventDefault();
        addSongs.songSubmit();
        mf.elementHide($("#add-reset"));
      });

      $("#add-reset").slideUp(); // Initially hidden so all its reveals look the same

      $("#add-form").on("change", ".add-input", function(e) { // Reveal the reset buton when any form field changes
        if($("#add-reset").hasClass("full-transparent")) {
          mf.elementReveal($("#add-reset"));
        }
      });

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
  };
});