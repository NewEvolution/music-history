define(["jquery", "firebase", "get-form-data"], function($, _firebase, formData){
  var myFirebaseRef = new Firebase("https://sizzling-torch-4887.firebaseio.com/songs");
  var alertModal = function(missingField) {
    var aOrAn = "";
    if(missingField.charAt(0) == "a") {
      aOrAn = " an ";
    } else {
      aOrAn = " a ";
    }
    $("#aOrAn").html(aOrAn);
    $("#invalid-field").html(missingField);
    $('#invalid-modal').modal('show');
  };
  return {
    songSubmit: function() {
      var isValid = true;
      var outputObj = {};
      inputObj = formData.pullData();
      for(var key in inputObj) {
        if(inputObj[key] === "" || inputObj[key].length === 0 || inputObj[key][0] === "") {
          alertModal(key);
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