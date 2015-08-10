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
requirejs(["jquery", "lodash", "firebase", "hbs", "bootstrap", "add-songs", "filter-songs"], 
function($, _, _firebase, Handlebars, bootstrap, addSongs, filterSongs){

  function elementHide(elementToHide) {
    $(elementToHide).addClass("fade-out-anim").on("animationend oAnimationEnd webkitAnimationEnd msAnimationEnd", function(e) {
      if(e.originalEvent.animationName === "fadeout") {
        $(this).addClass("full-transparent");
        $(this).removeClass("fade-out-anim");
        $(this).slideUp();
      }
    });
  }

  function elementReveal(elementToReveal) {
    $(elementToReveal).slideDown();
    $(elementToReveal).addClass("fade-in-anim").on("animationend oAnimationEnd webkitAnimationEnd msAnimationEnd", function(e) {
      if(e.originalEvent.animationName === "fadein") {
        $(this).removeClass("full-transparent");
        $(this).removeClass("fade-in-anim");
      }
    });
  }

  // Begin execute on DB change block ============================================================= //
  var myFirebaseRef = new Firebase("https://sizzling-torch-4887.firebaseio.com/");
  myFirebaseRef.child("songs").on("value", function(snapshot) {
    var retrievedSongsArr = []; // Array of songs to be populated from DB
    for(var key in snapshot.val()) {
      retrievedSongsArr[retrievedSongsArr.length] = snapshot.val()[key]; // Turn JSON object into array
    }
    function populatePage(songsObj) { // Populates the song list and form elements on initial page load
      require(["hbs!../templates/add-select", "hbs!../templates/add-dropdown", "hbs!../templates/songs",
        "hbs!../templates/genrecheck", "hbs!../templates/genreradio", "hbs!../templates/genreradiosingle",
        "hbs!../templates/genreradioother"],
      function(addSelectTemplate, addDropdownTemplate, songsTemplate, genreCheckTemplate, genreRadioTemplate,
        genreRadioSingleTemplate, genreRadioOtherTemplate){
        var currentPage = location.pathname.substring(1); // get the current HTML page name

        var uniqueArtists = _.chain(retrievedSongsArr).uniq("artist").pluck("artist").value();
        $("#artist").html(addSelectTemplate({item:uniqueArtists}));
        $("#add_artist-dropdown").html(addDropdownTemplate({artist:uniqueArtists}));

        var uniqueAlbums = _.chain(retrievedSongsArr).uniq("album").pluck("album").value();
        $("#album").html(addSelectTemplate({item:uniqueAlbums}));
        $("#add_album-dropdown").html(addDropdownTemplate({album:uniqueAlbums}));

        // Start genre block ======================================================================
        var uniqueGenres = _.chain(retrievedSongsArr).uniq("genre").pluck("genre").value();
        $("#genre").html(""); // Wipe the genre check/radio section on change so that it doesn't pile new on old
        var addonOtherField = false;
        if(uniqueGenres.length === 0) {
          addonOtherField = true;
        }
        while(uniqueGenres.length) {
          var genrePairArr = uniqueGenres.splice(0,2);
          if(currentPage === "index.html" || currentPage === "") { // Checkboxes if it's on index.html
            $("#genre").append(genreCheckTemplate({genre:genrePairArr}));
          } else if (currentPage === "add.html") { // Radio buttons if it's on add.html
            if(genrePairArr.length === 2) { // 2 by 2 for pairs of genres
              $("#genre").append(genreRadioTemplate({genre:genrePairArr}));
              addonOtherField = true;
            } else { // One-up for single dangling genres + other field
              $("#genre").append(genreRadioSingleTemplate({genre:genrePairArr}));
              addonOtherField = false;
            }
          }
        }
        if(addonOtherField && currentPage === "add.html") { // Add the full-width other field if extant genres are even
          $("#genre").append(genreRadioOtherTemplate);
        }
        // End genre block ========================================================================

        // Start song list block ==================================================================
        $(".content").html(songsTemplate(songsObj));
        $("section").each(function() { // Fade in all the song displays
          elementReveal(this);
        });

        $(".content").on("click", ".hide-btn", function(e) {
          elementHide($(this).parents(".song-section"));
          if($("#filter-reset").hasClass("full-transparent")) {
            elementReveal($("#filter-reset"));
          }
        });
        // End song list block ===================================================================

        // Start filter form block ================================================================
        $("#artist").change(function(e) {
          var selectedArtist = $(this).val();
          if(selectedArtist === "all") { // Reset album list to show all albums
            $("#album").html(addSelectTemplate({item:uniqueAlbums}));
          } else { // Populate the album select with only the chosen artists albums
            var artistAlbums = _.chain(retrievedSongsArr).filter({'artist': selectedArtist}).uniq("album").pluck("album").value();
            $("#album").html(addSelectTemplate({item:artistAlbums}));
          }
        });

        $("#album").change(function(e) {
          var selectedAlbum = $(this).val();
          if(selectedAlbum === "all") { // Reset artist list to show all artists
            $("#artist").html(addSelectTemplate({item:uniqueArtists}));
          } else { // Populate the artist select with only the artist who matches the album
            var albumArtist = _.chain(retrievedSongsArr).filter({'album': selectedAlbum}).uniq("artist").pluck("artist").value();
            $("#artist").html(addSelectTemplate({item:albumArtist}));
          }
        });

        $("#filter-submit").click(function(e) {
          e.preventDefault();
          if($("#filter-reset").hasClass("full-transparent") === false) {
            var sectionsToHide = filterSongs.songsFilter();
            for(var i=0; i<sectionsToHide.length; i++) {
              elementHide(sectionsToHide[i]);
            }
          }
        });

        $("#filter-reset").slideUp(); // Initially hidden so all its reveals look the same

        $(".filter-input").change(function(e) { // Reveal the reset buton when any form field changes
          if($("#filter-reset").hasClass("full-transparent")) {
            elementReveal($("#filter-reset"));
          }
        });

        $("#filter-reset").click(function(e) {
          e.preventDefault();
          elementHide($("#filter-reset"));
          var allHiddenSongs = $("section.row.full-transparent");
          for(var i=0; i<allHiddenSongs.length; i++) {
            elementReveal(allHiddenSongs[i]);
          }
          $('#filter-form').each(function() {
            this.reset();
          });
          $("#artist").html(addSelectTemplate({item:uniqueArtists}));
          $("#album").html(addSelectTemplate({item:uniqueAlbums}));
        });
        // End filter form block ==================================================================

        // Start add form block ===================================================================
        $("#add_artist-dropdown").on("click", ".artist-dr-item", function(e) {
          if($("#add-reset").hasClass("full-transparent")) {
            elementReveal($("#add-reset"));
          }
          var selectedArtist = this.name;
          $("#artist").val(selectedArtist);
          var artistAlbums = _.chain(retrievedSongsArr).filter({'artist': selectedArtist}).uniq("album").pluck("album").value();
          $("#add_album-dropdown").html(addDropdownTemplate({album:artistAlbums}));
        });
        
        $("#add_album-dropdown").on("click", ".album-dr-item", function(e) {
          if($("#add-reset").hasClass("full-transparent")) {
            elementReveal($("#add-reset"));
          }
          var selectedAlbum = this.name;
          $("#album").val(selectedAlbum);
          var albumArtist = _.chain(retrievedSongsArr).filter({'album': selectedAlbum}).uniq("artist").pluck("artist").value();
          $("#add_artist-dropdown").html(addDropdownTemplate({artist:albumArtist}));
        });

        $("#add-submit").click(function(e) {
          e.preventDefault();
          addSongs.songSubmit();
          elementHide($("#add-reset"));
        });

        $("#add-reset").slideUp(); // Initially hidden so all its reveals look the same

        $(".add-input").change(function(e) { // Reveal the reset buton when any form field changes
          if($("#add-reset").hasClass("full-transparent")) {
            elementReveal($("#add-reset"));
          }
        });

        $("#add-reset").click(function(e) {
          e.preventDefault();
          elementHide($("#add-reset"));
          $('#add-form').each(function() {
            this.reset();
          });
          $("#add_artist-dropdown").html(addDropdownTemplate({artist:uniqueArtists}));
          $("#add_album-dropdown").html(addDropdownTemplate({album:uniqueAlbums}));
        });
        // End add form block =====================================================================
      });
    }
    populatePage({songs:retrievedSongsArr});
  });
  // End execute on DB change block =============================================================== //
});