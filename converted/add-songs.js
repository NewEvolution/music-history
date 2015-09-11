define(["exports", "module", "get-form-data", "jquery", "uid"], function (exports, module, _getFormData, _jquery, _uid) {
  "use strict";

  var alertModal = function alertModal(missingField) {
    var aOrAn = "";
    if (missingField.charAt(0) == "a") {
      aOrAn = " an ";
    } else {
      aOrAn = " a ";
    }
    (0, _jquery)("#aOrAn").html(aOrAn);
    (0, _jquery)("#invalid-field").html(missingField);
    (0, _jquery)('#invalid-modal').modal('show');
  };

  module.exports = function (firebaseRef) {
    var isValid = true;
    var outputObj = {};
    inputObj = (0, _getFormData)();
    for (var key in inputObj) {
      // Verify all form fields are completed, pop up modal error if not
      if (inputObj[key] === "" || inputObj[key].length === 0 || inputObj[key][0] === "") {
        alertModal(key);
        isValid = false;
        break;
        // Genre radio array, only one possible value, need the value not the array
      } else if (Array.isArray(inputObj[key])) {
          outputObj[key] = inputObj[key][0];
        } else {
          // All other song properties
          outputObj[key] = inputObj[key];
        }
    }
    outputObj.uid = _uid.getUid();
    if (isValid) {
      // Clear out the form on sucessfull submission
      isValid = false;
      firebaseRef.child("songs").push(outputObj, function () {
        (0, _jquery)('#add-form').each(function () {
          this.reset();
        });
      });
    }
  };
});
//# sourceMappingURL=add-songs.js.map
