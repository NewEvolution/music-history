function songWriter(dataObj) {
  var songArr = dataObj.songs;
  for(var i=0; i<songArr.length; i++) {
    $("#content").append("<section><button class='delete'>Delete</button><h1>" + 
      songArr[i].title + "</h1><ul><li>" + songArr[i].artist + 
      "</li><li><span></span></li><li>" + songArr[i].album + 
      "</li><li><span></span></li><li>" + songArr[i].genre + 
      "</li></ul></section>");
  }
}

$(document).ready(function() {
  $.ajax({
    url: "songlist.json"
  }).done(function(data) {
    songWriter(data)
  })
});

$("#more").click(function(e) {
  $.ajax({
    url: "newsongs.json"
  }).done(function(data) {
    songWriter(data)
  })
});

$(".content").on("click", ".delete", function(e) {
  $(this).parent().remove();
});