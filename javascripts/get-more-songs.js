define(function(){
  return {
    getSongs: function(sentFunc, sentDom) {
      $.ajax({
        url: "newsongs.json"
      }).done(function(data) {
        sentFunc(data.songs, sentDom);
      });
    }
  };
});