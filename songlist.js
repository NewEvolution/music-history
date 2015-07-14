var contentDiv = document.getElementById("content");

var songs = [];

songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";
songs[songs.length] = "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill";

// add a song to the beginning
songs.unshift("Big Long Now > by Nirvana on the album Incesticide");
// add a song to the end
songs.push("The Notion of Backwards Motion > by Robot Science on the album Square");

for (var i=0; i<songs.length; i++) {
	var itemAsString = songs[i];
	itemAsString = itemAsString.replace(">", "-");
	itemAsString = itemAsString.replace(/\*/g, "");
	itemAsString = itemAsString.replace(/@/g, "");
	itemAsString = itemAsString.replace(/\(/g, "");
	itemAsString = itemAsString.replace(/!/g, "");
	songs[i] = "<p>" + itemAsString + "</p>";
}

contentDiv.innerHTML = songs.join("");