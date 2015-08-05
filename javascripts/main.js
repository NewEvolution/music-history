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

requirejs(["jquery", "hbs", "bootstrap", "dom-access", "populate-songs", "get-more-songs"], 
  function($, Handlebars, bootstrap, dom, populate, more){
  populate.getSongs(function(songsObj){
    require(["hbs!../templates/songs", "hbs!../templates/artists", "hbs!../templates/albums"],
      function(songsTemplate, artistsTemplate, albumsTemplate){
      dom.getDomElement().html(songsTemplate(songsObj));
      $("#artist").append(artistsTemplate(songsObj));
      $("#album").append(albumsTemplate(songsObj));
    });
  });
  $("#more").click(function(e) {
    more.getSongs(function(songsObj){
      require(["hbs!../templates/songs", "hbs!../templates/artists", "hbs!../templates/albums"],
      function(songsTemplate, artistsTemplate, albumsTemplate){
        dom.getDomElement().append(songsTemplate(songsObj));
        $("#artist").append(artistsTemplate(songsObj));
        $("#album").append(albumsTemplate(songsObj));
      });
    });
  });
  $(".content").on("click", ".delete", function(e) {
    $(this).parent().parent().addClass("fade-transition").on("transitionend oTransitionEnd webkitTransitionEnd msTransitionEnd", function() {
      $(this).slideUp();
    });
  });
});