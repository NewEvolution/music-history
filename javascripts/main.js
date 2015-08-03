requirejs(["dom-access", "populate-songs", "get-more-songs"], function(dom, populate, more){
  populate.getSongs(songWriter, dom.getDomElement());
  $("#more").click(function(e) {
    more.getSongs(songWriter, dom.getDomElement());
  });
});


function songWriter(dataArr, domEle) {
  for(var i=0; i<dataArr.length; i++) {
    domEle.before("<section><button class='delete'>Delete</button><h1>" + 
      dataArr[i].title + "</h1><ul><li>" + dataArr[i].artist + 
      "</li><li><span></span></li><li>" + dataArr[i].album + 
      "</li><li><span></span></li><li>" + dataArr[i].genre + 
      "</li></ul></section>");
  }
}

// Remove button for song sections
$(".content").on("click", ".delete", function(e) {
  $(this).parent().remove();
});