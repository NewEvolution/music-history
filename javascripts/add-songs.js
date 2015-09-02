import * as formData from "es6!get-form-data";
import * as $ from "jquery";
import * as uid from "es6!uid";
let alertModal = missingField => {
  let aOrAn = "";
  if(missingField.charAt(0) == "a") {
    aOrAn = " an ";
  } else {
    aOrAn = " a ";
  }
  $("#aOrAn").html(aOrAn);
  $("#invalid-field").html(missingField);
  $('#invalid-modal').modal('show');
};
export default firebaseRef => {
  let isValid = true;
  let outputObj = {};
  inputObj = formData();
  for(let key in inputObj) {
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
  outputObj.uid = uid.getUid();
  if(isValid) { // Clear out the form on sucessfull submission
    isValid = false;
    firebaseRef.child("songs").push(outputObj, () => {
      $('#add-form').each(() => {
        this.reset();
      });
    });
  }
};