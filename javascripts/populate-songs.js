define(function(){
  return {
    getSongs: function(sentFunc, sentDom) {
      $.ajax({
        url: "songlist.json"
      }).done(function(data) {
        sentFunc(data.songs, sentDom);
      });
    }
  };
});