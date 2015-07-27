function songWriter(dataObj) {
  var songArr = dataObj.songs;
  for(var i=0; i<songArr.length; i++) {
    $("#content").append("<section><h1>" + songArr[i].title + "</h1><ul>");
    $("#content").append("<li>" + songArr[i].artist + "</li><li><span></span></li>");
    $("#content").append("<li>" + songArr[i].album + "</li><li><span></span></li>");
    $("#content").append("<li>" + songArr[i].genre + "</li></ul>");
    $("#content").append("<button class='delete'>Delete</button></section>");
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

$(".delete").click(function(e) {
  $(this).parent().remove();
});