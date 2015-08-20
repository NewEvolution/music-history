define(function(require){
  var populate = require("populate-songs");
  var slh = require("song-list-handlers");
  var uid = require("uid");
  var fh = require("filter-handlers");
  var ah = require("add-handlers");
  var Q = require("q");

  var firebaseRef = new Firebase("https://sizzling-torch-4887.firebaseio.com/");
  var currentPage = location.pathname.substring(1); // get the current HTML page name
  var currentUser = uid.getUid();
  var deferred = Q.defer();
  
  // Execute on DB change
  firebaseRef.child("songs").orderByChild("uid").equalTo(currentUser).on("value", function(snapshot) {
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