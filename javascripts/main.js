// Pull in all the various javascript libraries
requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash': '../bower_components/lodash/lodash.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});

// The main function requiring all our anciliary scripts
requirejs(["jquery", "lodash", "firebase", "hbs", "bootstrap", "add-songs"], 
function($, _, _firebase, Handlebars, bootstrap, addSongs){
  var myFirebaseRef = new Firebase("https://sizzling-torch-4887.firebaseio.com/");
  myFirebaseRef.child("songs").on("value", function(snapshot) {
    var retrievedSongsArr = [];
    for(var key in snapshot.val()) {
      retrievedSongsArr[retrievedSongsArr.length] = snapshot.val()[key];
    }
    // Populates the song list and form elements on initial page load
    function populatePage(songsObj) {
      require(["hbs!../templates/artists", "hbs!../templates/albums", "hbs!../templates/songs", "hbs!../templates/genrecheck", "hbs!../templates/genreradio", "hbs!../templates/genreradiosingle", "hbs!../templates/genreradioother"],
      function(artistsTemplate, albumsTemplate, songsTemplate, genreCheckTemplate, genreRadioTemplate, genreRadioSingleTemplate, genreRadioOtherTemplate){
        $("#artist").append(artistsTemplate(songsObj));
        $("#album").append(albumsTemplate(songsObj));
        // Grabs all the genres for checkboxes or radio buttons
        var uniqueGenres = _.chain(retrievedSongsArr).uniq("genre").pluck("genre").value();
        var currentPage = location.pathname.substring(1);
        $("#genre").html(""); // Wipe the genre check/radio section on change so that it doesn't pile new on old
        var addonOtherField = false;
        while(uniqueGenres.length) {
          var genrePairArr = uniqueGenres.splice(0,2);
          var genrePairObjArr = [];
          for(var i=0; i<genrePairArr.length; i++) {
            var genrePairObj = {};
            genrePairObj.genre = genrePairArr[i];
            genrePairObjArr[i] = genrePairObj;
          }
          if(currentPage === "index.html" || currentPage === "") {
            $("#genre").append(genreCheckTemplate({genre:genrePairObjArr}));
          } else if (currentPage === "add.html") {
            if(genrePairObjArr.length === 2) {
              $("#genre").append(genreRadioTemplate({genre:genrePairObjArr}));
              addonOtherField = true;
            } else {
              $("#genre").append(genreRadioSingleTemplate({genre:genrePairObjArr}));
              addonOtherField = false;
            }
          }
        }
        if(addonOtherField && currentPage === "add.html") {
          $("#genre").append(genreRadioOtherTemplate);
        }
        $(".content").html(songsTemplate(songsObj));
        $("section").each(function() {
          elementReveal(this);
        });
      });
    }
    populatePage({songs:retrievedSongsArr});
  });

  // Hides elements
  function elementHide(elementToHide) {
    $(elementToHide).addClass("fade-out-anim").on("animationend oAnimationEnd webkitAnimationEnd msAnimationEnd", function(e) {
      if(e.originalEvent.animationName === "fadeout") {
        $(this).addClass("full-transparent");
        $(this).removeClass("fade-out-anim");
        $(this).slideUp();
      }
    });
  }

  // Reveals hidden elements
  function elementReveal(elementToReveal) {
    $(elementToReveal).slideDown();
    $(elementToReveal).addClass("fade-in-anim").on("animationend oAnimationEnd webkitAnimationEnd msAnimationEnd", function(e) {
      if(e.originalEvent.animationName === "fadein") {
        $(this).removeClass("full-transparent");
        $(this).removeClass("fade-in-anim");
      }
    });
  }

  $(".content").on("click", ".delete", function(e) {
    elementHide($(this).parent().parent());
  });

  $("#add-submit").click(function(e) {
    e.preventDefault();
    addSongs.songSubmit();
  });

  $("#filter-submit").click(function(e) {
    e.preventDefault();
    elementReveal($("#filter-remove"));
  });

  $("#filter-remove").slideUp();

  $("#filter-remove").click(function(e) {
    e.preventDefault();
    elementHide($("#filter-remove"));
  });
});