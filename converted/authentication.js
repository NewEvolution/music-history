define(["exports", "firebase", "uid"], function (exports, _firebase, _uid) {
  "use strict";

  var ref = new Firebase("https://sizzling-torch-4887.firebaseio.com");
  var authData = ref.getAuth();
  if (authData === null) {
    ref.authWithOAuthPopup("github", function (error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        _uid.setUid(authData.uid);
        require(["scaffold"], function () {});
      }
    }, { remember: "sessionOnly" });
  } else {
    _uid.setUid(authData.uid);
    require(["scaffold"], function () {});
  }
});
//# sourceMappingURL=authentication.js.map
