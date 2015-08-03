# music-history

Your task is to take the code that you wrote for Music History 4, where you populated your song list via two AJAX calls, and use RequireJS to accomplish the following.

+ The main module should have a minimum of three dependencies: ["dom-access", "populate-songs", "get-more-songs"].
+ The dom-access modules should return a reference to the DOM element in your HTML that will contain the song list.
+ The populate-songs file should contain the AJAX call to your first JSON file with songs in it. This module should return the array of songs.
+ The get-more-songs file should contain the AJAX call to your second JSON file with songs in it. This module should return the array of songs.
+ The main module should then use the return objects from all three dependencies to populate your song list.