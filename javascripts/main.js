requirejs(["dom-access", "populate-songs", "get-more-songs"], function(dom, populate, more){
  populate.getSongs(songWriter, dom.getDomElement());
  $("#more").click(function(e) {
    more.getSongs(songWriter, dom.getDomElement());
  });
});


function songWriter(dataArr, domEle) {
  for(var i=0; i<dataArr.length; i++) {
    domEle.append("<section class='row'><div class='col-xs-1'><button class='delete btn btn-danger btn-xs'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button></div><div class='col-xs-11'><h1>" + 
      dataArr[i].title + "</h1><ul class='list-inline'><li>" + dataArr[i].artist + 
      "</li><li><span class='li-divider'></span></li><li>" + dataArr[i].album + 
      "</li><li><span class='li-divider'></span></li><li>" + dataArr[i].genre + 
      "</li></ul></div></section>");
  }
}

// Remove button for song sections
$(".content").on("click", ".delete", function(e) {
  $(this).parent().parent().remove();
});