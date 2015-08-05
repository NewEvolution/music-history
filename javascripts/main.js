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
    require(["hbs!../templates/songs"], function(songTemplate){
      dom.getDomElement().html(songTemplate(songsObj));
    });
  });
  $("#more").click(function(e) {
    more.getSongs(function(songsObj){
      require(["hbs!../templates/songs"], function(songTemplate){
        dom.getDomElement().append(songTemplate(songsObj));
      });
    });
  });
  $(".content").on("click", ".delete", function(e) {
    $(this).parent().parent().addClass("fade-animate");
  });
});