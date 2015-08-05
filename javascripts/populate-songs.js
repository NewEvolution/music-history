define(["jquery"], function($){
  return {
    getSongs: function(sentFunc) {
      $.ajax({
        url: "songlist.json"
      }).done(function(data) {
        sentFunc(data);
      });
    }
  };
});