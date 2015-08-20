define(function(require){
  var $ = require("jquery");
  var auth = require("authentication");
  var formData = require("get-form-data");
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
    songSubmit: function(firebaseRef) {
      var isValid = true;
      var outputObj = {};
      inputObj = formData.pullData();
      for(var key in inputObj) {
        // Verify all form fields are completed, pop up modal error if not
        if(inputObj[key] === "" || inputObj[key].length === 0 || inputObj[key][0] === "") {
          alertModal(key);
          isValid = false;
          break;
        // Genre radio array, only one possible value, need the value not the array
        } else if (Array.isArray(inputObj[key])) {
          outputObj[key] = inputObj[key][0];
        } else { // All other song properties
          outputObj[key] = inputObj[key];
        }
      }
      outputObj.uid = auth.getUid();
      if(isValid) { // Clear out the form on sucessfull submission
        isValid = false;
        firebaseRef.child("songs").push(outputObj, function() {
          $('#add-form').each(function() {
            this.reset();
          });
        });
      }
    }
  };
});