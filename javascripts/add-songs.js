define(["jquery", "get-form-data"], function($, formData){
  console.log("inside add-songs");
  return {
    getSongs: function(sentFunc) {
      $.ajax({
        url: "https://sizzling-torch-4887.firebaseio.com/.json"
      }).done(function(data) {
        sentFunc(data);
      });
    }
  };
});