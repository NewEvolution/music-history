// Pull in all the various javascript libraries
requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});

// The main function requiring all our anciliary scripts
requirejs(["jquery", "hbs", "bootstrap", "dom-access", "populate-songs", "get-more-songs", "add-songs"], 
  function($, Handlebars, bootstrap, dom, populate, moreSongs, addSongs){

  // Removes (acutally hides) elements
  function elementRemove(elementToRemove) {
    $(elementToRemove).addClass("fade-out-anim").on("animationend oAnimationEnd webkitAnimationEnd msAnimationEnd", function() {
      $(this).addClass("full-transparent");
      $(this).slideUp();
    });
  }

  // Reveals hidden elements
  function elementReveal(elementToReveal) {
    $(elementToReveal).slideDown();
    $(elementToReveal).addClass("full-transparent");
    $(elementToReveal).addClass("fade-in-anim").on("animationend oAnimationEnd webkitAnimationEnd msAnimationEnd", function() {
      $(this).removeClass("full-transparent");
      $(this).removeClass("fade-in-anim");
    });
  }

  // Populates the song list and form elements on initial page load
  populate.getSongs(function(songsObj){
    require(["hbs!../templates/artists", "hbs!../templates/albums", "hbs!../templates/songs", "hbs!../templates/genres"],
    function(artistsTemplate, albumsTemplate, songsTemplate, genreTemplate){
      var allGenres = [];
      $("#artist").append(artistsTemplate(songsObj));
      $("#album").append(albumsTemplate(songsObj));
      // Grabs all the genres for checkboxes or radio buttons
      for(var key in songsObj.songs) {
        var currentGenre = songsObj.songs[key].genre;
        if(allGenres.indexOf(currentGenre) === -1) {
          allGenres[allGenres.length] = currentGenre;
        }
      }
      console.log("allGenres", allGenres);
      dom.getDomElement().html(songsTemplate(songsObj));
      $("section").each(function() {
        elementReveal(this);
      });
    });
  });
  // $("#more").click(function(e) {
  //   moreSongs.getSongs(function(songsObj){
  //     require(["hbs!../templates/songs", "hbs!../templates/artists", "hbs!../templates/albums"],
  //     function(songsTemplate, artistsTemplate, albumsTemplate){
  //       dom.getDomElement().append(songsTemplate(songsObj));
  //       $("#artist").append(artistsTemplate(songsObj));
  //       $("#album").append(albumsTemplate(songsObj));
  //     });
  //   });
  // });
  $(".content").on("click", ".delete", function(e) {
    elementRemove($(this).parent().parent());
  });
  $("#add-submit").click(function(e) {
    e.preventDefault();
    addSongs.songSubmit();
  });
  $("#filter-submit").click(function(e) {
    e.preventDefault();
  });
});