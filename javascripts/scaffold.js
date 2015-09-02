define(function(require){
  var songListHandlers = require("song-list-handlers");
  var filterHandlers = require("filter-handlers");
  var addHandlers = require("add-handlers");
  var populate = require("populate-songs");
  var search = require("search");
  var uid = require("uid");
  var Q = require("q");

  var firebaseRef = new Firebase("https://sizzling-torch-4887.firebaseio.com/");
  var currentPage = location.pathname.substring(1); // get the current HTML page name
  var currentUser = uid.getUid();
  var deferred = Q.defer();
  
  // Execute on DB change
  firebaseRef.child("songs").orderByChild("uid").equalTo(currentUser).on("value", function(snapshot) {
    var retrievedSongsObj = snapshot.val();
    populate(retrievedSongsObj, currentPage, deferred);
  });

  // Song List Handlers
  songListHandlers(firebaseRef);

  deferred.promise.then(function(promisedObj) {
    // Filter Form Handlers
    filterHandlers(promisedObj.u_artists, promisedObj.u_albums, promisedObj.songs_a);
    // Add Form Handlers
    addHandlers(promisedObj.u_artists, promisedObj.u_albums, promisedObj.songs_a, firebaseRef);
  });
});