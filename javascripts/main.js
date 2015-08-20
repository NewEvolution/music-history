// Pull in all the various javascript libraries
requirejs.config({
  baseUrl: "./javascripts",
  paths: {
    "jquery": "../lib/bower_components/jquery/dist/jquery.min",
    "firebase": "../lib/bower_components/firebase/firebase",
    "lodash": "../lib/bower_components/lodash/lodash.min",
    "hbs": "../lib/bower_components/require-handlebars-plugin/hbs",
    "bootstrap": "../lib/bower_components/bootstrap/dist/js/bootstrap.min",
    "q": "../lib/bower_components/q/q"
  },
  shim: {
    "bootstrap": ["jquery"],
    "firebase": {
      exports: "Firebase"
    }
  }
});

// The main function requiring all our anciliary scripts
requirejs(["dependencies", "authentication"],
function(dependencies, auth){
  var ref = new Firebase("https://sizzling-torch-4887.firebaseio.com");
  var authData = ref.getAuth();
  if(authData === null) {
    ref.authWithOAuthPopup("github", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        auth.setUid(authData.uid);
        require(["scaffold"], function() {});
      }
    });
  } else {
    auth.setUid(authData.uid);
    require(["scaffold"], function() {});
  }
});