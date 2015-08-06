define(["jquery"], function($){
  $theArtist = $("#artist").val();
  $theAlbum = $("#album").val();
  $theGenre = ""
  $allGenres = $("[name='genre']");
  for(var i=0; i<$allGenres.length; i++) {
    console.log("$allGenres[", i,  "]", $allGenres[i])
  }
});