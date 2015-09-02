import * as firebase from "firebase";
import * as uid from "es6!uid";
let ref = new Firebase("https://sizzling-torch-4887.firebaseio.com");
let authData = ref.getAuth();
if(authData === null) {
  ref.authWithOAuthPopup("github", (error, authData) => {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      uid.setUid(authData.uid);
      require(["es6!scaffold"], () => {});
    }
  },
  {remember: "sessionOnly"});
} else {
  uid.setUid(authData.uid);
  require(["es6!scaffold"], () => {});
}