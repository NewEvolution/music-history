function songWriter(dataObj) {
  var songArr = dataObj.songs;
  for(var i=0; i<songArr.length; i++) {
    $("#content").append("<section><h1>" + songArr[i].title + "</h1><ul>");
    $("#content").append("<li>" + songArr[i].artist + "</li><li><span></span></li>");
    $("#content").append("<li>" + songArr[i].album + "</li><li><span></span></li>");
    $("#content").append("<li>" + songArr[i].genre + "</li></ul></section>");
  }
}

$(document).ready(function() {
  $.ajax({
    url: "songlist.json"
  }).done(function(data) {
    songWriter(data)
  })
});


// var contentDiv = document.getElementById("content");

// var songs = [];

// songs.push("Legs > by Z*ZTop on the album Eliminator",
//   "The Logical Song > by Supertr@amp on the album Breakfast in America",
//   "Another Brick in the Wall > by Pink Floyd on the album The Wall",
//   "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction",
//   "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill");

// // add a song to the beginning
// songs.unshift("Big Long Now > by Nirvana on the album Incesticide");
// // add a song to the end
// songs.push("The Notion of Backwards Motion > by Robot Science on the album Square");

// for (var i=0; i<songs.length; i++) {
//   var itemAsString = songs[i];
//   itemAsString = itemAsString.replace(/\>/g, "-");
//   itemAsString = itemAsString.replace(/\*/g, "");
//   itemAsString = itemAsString.replace(/\@/g, "");
//   itemAsString = itemAsString.replace(/\(/g, "");
//   itemAsString = itemAsString.replace(/\!/g, "");
//   songs[i] = "<p>" + itemAsString + "</p>";
// }

// contentDiv.innerHTML = songs.join("");