define(["jquery", "firebase", "get-form-data"], function($, _firebase, formData){
  var myFirebaseRef = new Firebase("https://sizzling-torch-4887.firebaseio.com/songs");
  var alertWindow = function(missingField) {
    var aOrAn = "";
    if(missingField.charAt(0) == "a") {
      aOrAn = " an ";
    } else {
      aOrAn = " a ";
    }
    alert("New songs cannot be submitted without" + aOrAn + missingField + ".");
  };
  return {
    songSubmit: function() {
      var isValid = true;
      var outputObj = {};
      inputObj = formData.pullData();
      for(var key in inputObj) {
        if(inputObj[key] === "" || inputObj[key].length === 0 || inputObj[key][0] === "") {
          alertWindow(key);
          isValid = false;
          break;
        } else if (Array.isArray(inputObj[key])) {
          outputObj[key] = inputObj[key][0];
        } else {
          outputObj[key] = inputObj[key];
        }
      }
      if(isValid) {
        isValid = false;
        myFirebaseRef.push(outputObj, function() {
          $('#add-form').each(function() {
            this.reset();
          });
        });
      }
    }
  };
});