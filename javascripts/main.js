// Pull in all the various javascript libraries
requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash': '../bower_components/lodash/lodash.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'q': '../bower_components/q/q'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});

// The main function requiring all our anciliary scripts
requirejs(["jquery", "lodash", "firebase", "hbs", "bootstrap", "q", "add-songs", "filter-songs",
  "populate-songs", "multiuse-functions", "song-list-handlers", "filter-handlers", "add-handlers", "hb-template"], 
function($, _, _firebase, Handlebars, bootstrap, Q, addSongs, filterSongs, populate, muf, slh, fh, ah, template){

  var myFirebaseRef = new Firebase("https://sizzling-torch-4887.firebaseio.com/");
  var currentPage = location.pathname.substring(1); // get the current HTML page name
  var deferred = Q.defer();
  
  // Execute on DB change
  myFirebaseRef.child("songs").on("value", function(snapshot) {
    var retrievedSongsObj = snapshot.val();
    populate.populatePage(retrievedSongsObj, currentPage, deferred);
  });

  // Song List Handlers
  slh.handlers(myFirebaseRef);

  deferred.promise.then(function(promisedObj) {
    // Filter Form Handlers
    fh.handlers(promisedObj.u_artists, promisedObj.u_albums, promisedObj.songs_a);
    // Add Form Handlers
    ah.handlers(promisedObj.u_artists, promisedObj.u_albums, promisedObj.songs_a);
  });
});