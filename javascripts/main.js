// Pull in all the various javascript libraries
requirejs.config({
  baseUrl: "./javascripts",
  paths: {
    "q": "../lib/bower_components/q/q",
    "es6": "../lib/bower_components/requirejs-babel/es6",
    "lodash": "../lib/bower_components/lodash/lodash.min",
    "firebase": "../lib/bower_components/firebase/firebase",
    "jquery": "../lib/bower_components/jquery/dist/jquery.min",
    "hbs": "../lib/bower_components/require-handlebars-plugin/hbs",
    "babel": "../lib/bower_components/requirejs-babel/babel-5.8.22.min",
    "bootstrap": "../lib/bower_components/bootstrap/dist/js/bootstrap.min"
  },
  shim: {
    "bootstrap": ["jquery"],
    "firebase": {
      exports: "Firebase"
    }
  }
});

// The main function requiring all our anciliary scripts
requirejs(["es6!dependencies", "es6!authentication"],
function(dependencies, auth){
});