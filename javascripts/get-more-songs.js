define(["jquery"], function($){
  return {
    getSongs: function(sentFunc) {
      $.ajax({
        url: "newsongs.json"
      }).done(function(data) {
        sentFunc(data);
  console.log("clicking");
      });
    }
  };
});