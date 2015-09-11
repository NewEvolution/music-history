module.exports = function(grunt) {
  grunt.initConfig({
    requirejs: {
      compile: {
        options: {
          baseUrl: "../",
          dir: "./min",
          appDir: './converted',
          modules: [
            {
              name: "main"
            }
          ],
          paths: {
            q: "../lib/bower_components/q/q",
            lodash: "../lib/bower_components/lodash/lodash.min",
            firebase: "../lib/bower_components/firebase/firebase",
            jquery: "../lib/bower_components/jquery/dist/jquery.min",
            hbs: "../lib/bower_components/require-handlebars-plugin/hbs",
            bootstrap: "../lib/bower_components/bootstrap/dist/js/bootstrap.min"
          }
        }
      }
    },
    babel: {
        options: {
            sourceMap: true,
            modules: "amd"
        },
        dist: {
            files: {
                '../converted/add-handlers.js': '../javascripts/add-handlers.js',
                '../converted/add-songs.js': '../javascripts/add-songs.js',
                '../converted/authentication.js': '../javascripts/authentication.js',
                '../converted/dependencies.js': '../javascripts/dependencies.js',
                '../converted/filter-handlers.js': '../javascripts/filter-handlers.js',
                '../converted/filter-songs.js': '../javascripts/filter-songs.js',
                '../converted/get-form-data.js': '../javascripts/get-form-data.js',
                '../converted/hb-template.js': '../javascripts/hb-template.js',
                '../converted/multiuse-functions.js': '../javascripts/multiuse-functions.js',
                '../converted/populate-songs.js': '../javascripts/populate-songs.js',
                '../converted/scaffold.js': '../javascripts/scaffold.js',
                '../converted/search.js': '../javascripts/search.js',
                '../converted/song-list-handlers.js': '../javascripts/song-list-handlers.js',
                '../converted/uid.js': '../javascripts/uid.js'
            }
        }
    },
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3,
          progressive: true,
          interlaced: true
        },
        files: [{
          expand: true,
          cwd: "../dev-images/",
          src: ["**/*.{png,jpg,gif}"],
          dest: "../images/"
        }]
      }
    },
    plato: {
      your_task: {
        files: {
          "../report": ["../javascripts/**/*.js"]
        }
      }
    },
    jshint: {
      files: ["../javascripts/**/*.js"],
      options: {
        esnext: true
      }
    },
    sass: {
      dist: {
        files: {
          "../styles/main.css": "../sass/main.scss"
        }
      }
    },
    watch: {
      javascripts: {
        files: ["../javascripts/**/*.js"],
        tasks: ["jshint"]
      },
      sassy: {
        files: ["../sass/**/*.scss"],
        tasks: ["sass"]
      },
      es6convert: {
        files: ["../javascripts/**/*.js"],
        tasks: ["babel"]
      }
    }
  });
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.registerTask("default", ["newer:babel", "newer:imagemin", "newer:plato", "newer:jshint", "newer:sass", "watch"]);
};
