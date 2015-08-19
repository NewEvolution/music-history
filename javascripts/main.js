// Pull in all the various javascript libraries
requirejs.config({
  baseUrl: "./javascripts",
  paths: {
    "jquery": "../lib/bower_components/jquery/dist/jquery.min",
    "firebase": "../lib/bower_components/firebase/firebase",
    "lodash": "../lib/bower_components/lodash/lodash.min",
    "hbs": "../lib/bower_components/require-handlebars-plugin/hbs",
    "bootstrap": "../lib/bower_components/bootstrap/dist/js/bootstrap.min",
    "q": "../lib/bower_components/q/q"
  },
  shim: {
    "bootstrap": ["jquery"],
    "firebase": {
      exports: "Firebase"
    }
  }
});

// The main function requiring all our anciliary scripts
requirejs(["dependencies", "firebase", "q", "populate-songs", "song-list-handlers", "filter-handlers", "add-handlers"],
function(dependencies, _firebase, Q, populate, slh, fh, ah){

  var firebaseRef = new Firebase("https://sizzling-torch-4887.firebaseio.com/");
  var currentPage = location.pathname.substring(1); // get the current HTML page name
  var deferred = Q.defer();
  
  // Execute on DB change
  firebaseRef.child("songs").on("value", function(snapshot) {
    var retrievedSongsObj = snapshot.val();
    populate.populatePage(retrievedSongsObj, currentPage, deferred);
  });

  // Song List Handlers
  slh.handlers(firebaseRef);

  deferred.promise.then(function(promisedObj) {
    // Filter Form Handlers
    fh.handlers(promisedObj.u_artists, promisedObj.u_albums, promisedObj.songs_a);
    // Add Form Handlers
    ah.handlers(promisedObj.u_artists, promisedObj.u_albums, promisedObj.songs_a, firebaseRef);
  });
});