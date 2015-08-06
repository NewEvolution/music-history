define(["jquery", "get-form-data"], function($, formData){
  return {
    songSubmit: function() {
      sendingJson = JSON.stringify(formData.pullData());
      console.log(sendingJson);
    }
  };
});