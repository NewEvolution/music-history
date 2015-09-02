import * as firebase from "firebase";
import * as uid from "uid";
var ref = new Firebase("https://sizzling-torch-4887.firebaseio.com");
var authData = ref.getAuth();
if(authData === null) {
  ref.authWithOAuthPopup("github", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      uid.setUid(authData.uid);
      require(["scaffold"], function() {});
    }
  },
  {remember: "sessionOnly"});
} else {
  uid.setUid(authData.uid);
  require(["scaffold"], function() {});
}