import * as songListHandlers from "es6!song-list-handlers";
import * as filterHandlers from "es6!filter-handlers";
import * as addHandlers from "es6!add-handlers";
import * as populate from "es6!populate-songs";
import * as search from "es6!search";
import * as uid from "es6!uid";
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