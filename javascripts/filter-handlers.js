import * as filterSongs from "es6!filter-songs";
import * as template from "es6!hb-template";
import * as mf from "es6!multiuse-functions";
import * as $ from "jquery";
export default (uniqueArtists, uniqueAlbums, retrievedSongsArr) => {
  // Initially hidden so all its reveals look the same
  $("#filter-reset").slideUp();
  // Artist dropdown menu
  $("#artist").change(e => {
    let selectedArtist = $(this).val();
    if(selectedArtist === "all") { // Reset album list to show all albums
      $("#album").html(template.addSelect({item:uniqueAlbums}));
    } else { // Populate the album select with only the chosen artists albums
      let artistAlbums = _.chain(retrievedSongsArr).filter({'artist': selectedArtist}).uniq("album").pluck("album").value();
      $("#album").html(template.addSelect({item:artistAlbums}));
    }
  });
  // Album dropdown menu
  $("#album").change(e => {
    let selectedAlbum = $(this).val();
    if(selectedAlbum === "all") { // Reset artist list to show all artists
      $("#artist").html(template.addSelect({item:uniqueArtists}));
    }
  });
  // Submit button
  $("#filter-submit").click(e => {
    e.preventDefault();
    if($("#filter-reset").hasClass("full-transparent") === false) {
      let sectionsToHide = filterSongs();
      for(let i=0; i<sectionsToHide.length; i++) {
        mf.elementHide(sectionsToHide[i]);
      }
    }
  });
  // Reveal the reset buton when any form field changes
  $("#filter-form").on( "change", ".filter-input", e => {
    if($("#filter-reset").hasClass("full-transparent")) {
      mf.elementReveal($("#filter-reset"));
    }
  });
  // Reset Button
  $("#filter-reset").click(e => {
    e.preventDefault();
    mf.elementHide($("#filter-reset"));
    let allHiddenSongs = $("section.row.full-transparent");
    for(let i=0; i<allHiddenSongs.length; i++) {
      mf.elementReveal(allHiddenSongs[i]);
    }
    $('#filter-form').each(() => {
      this.reset();
    });
    $("#artist").html(template.addSelect({item:uniqueArtists}));
    $("#album").html(template.addSelect({item:uniqueAlbums}));
  });
};