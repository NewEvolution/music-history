import * as songListHandlers from "song-list-handlers";
import * as filterHandlers from "filter-handlers";
import * as addHandlers from "add-handlers";
import * as populate from "populate-songs";
import * as search from "search";
import * as uid from "uid";
import * as Q from "q";

let firebaseRef = new Firebase("https://sizzling-torch-4887.firebaseio.com/");
let currentPage = location.pathname.substring(1); // get the current HTML page name
let currentUser = uid.getUid();
let deferred = Q.defer();

// Execute on DB change
firebaseRef.child("songs").orderByChild("uid").equalTo(currentUser).on("value", snapshot => {
  let retrievedSongsObj = snapshot.val();
  populate(retrievedSongsObj, currentPage, deferred);
});

// Song List Handlers
songListHandlers(firebaseRef);

deferred.promise.then(promisedObj => {
  // Filter Form Handlers
  filterHandlers(promisedObj.u_artists, promisedObj.u_albums, promisedObj.songs_a);
  // Add Form Handlers
  addHandlers(promisedObj.u_artists, promisedObj.u_albums, promisedObj.songs_a, firebaseRef);
});