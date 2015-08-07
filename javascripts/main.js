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

requirejs(["jquery", "hbs", "bootstrap", "dom-access", "populate-songs", "get-more-songs", "add-songs"], 
  function($, Handlebars, bootstrap, dom, populate, more, addSongs){
  function elementRemoval(elementToRemove) {
    $(elementToRemove).addClass("fade-animation").on("animationend oAnimationEnd webkitAnimationEnd msAnimationEnd", function() {
      $(this).addClass("not-visible");
      $(this).slideUp();
    });
  }
  function elementReveal(elementToReveal) {
    $(elementToReveal).addClass("fade-animation").on("animationend oAnimationEnd webkitAnimationEnd msAnimationEnd", function() {
      $(this).addClass("not-visible");
      $(this).slideUp();
    });
  }
  populate.getSongs(function(songsObj){
    require(["hbs!../templates/artists", "hbs!../templates/albums", "hbs!../templates/songs"],
      function(artistsTemplate, albumsTemplate, songsTemplate){
      $("#artist").append(artistsTemplate(songsObj));
      $("#album").append(albumsTemplate(songsObj));
      dom.getDomElement().html(songsTemplate(songsObj));
    });
  });
  // $("#more").click(function(e) {
  //   more.getSongs(function(songsObj){
  //     require(["hbs!../templates/songs", "hbs!../templates/artists", "hbs!../templates/albums"],
  //     function(songsTemplate, artistsTemplate, albumsTemplate){
  //       dom.getDomElement().append(songsTemplate(songsObj));
  //       $("#artist").append(artistsTemplate(songsObj));
  //       $("#album").append(albumsTemplate(songsObj));
  //     });
  //   });
  // });
  $(".content").on("click", ".delete", function(e) {
    elementRemoval($(this).parent().parent());
  });
  $("#add-submit").click(function(e) {
    e.preventDefault();
    addSongs.songSubmit();
  });
});