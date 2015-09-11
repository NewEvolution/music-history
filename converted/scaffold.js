define(["exports", "song-list-handlers", "filter-handlers", "add-handlers", "populate-songs", "search", "uid", "q"], function (exports, _songListHandlers, _filterHandlers, _addHandlers, _populateSongs, _search, _uid, _q) {
  "use strict";

  var firebaseRef = new Firebase("https://sizzling-torch-4887.firebaseio.com/");
  var currentPage = location.pathname.substring(1); // get the current HTML page name
  var currentUser = _uid.getUid();
  var deferred = _q.defer();

  // Execute on DB change
  firebaseRef.child("songs").orderByChild("uid").equalTo(currentUser).on("value", function (snapshot) {
    var retrievedSongsObj = snapshot.val();
    (0, _populateSongs)(retrievedSongsObj, currentPage, deferred);
  });

  // Song List Handlers
  (0, _songListHandlers)(firebaseRef);

  deferred.promise.then(function (promisedObj) {
    // Filter Form Handlers
    (0, _filterHandlers)(promisedObj.u_artists, promisedObj.u_albums, promisedObj.songs_a);
    // Add Form Handlers
    (0, _addHandlers)(promisedObj.u_artists, promisedObj.u_albums, promisedObj.songs_a, firebaseRef);
  });
});
//# sourceMappingURL=scaffold.js.map
