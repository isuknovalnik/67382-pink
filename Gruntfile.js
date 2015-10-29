'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var config = {
    pkg: grunt.file.readJSON('package.json'),

    less: {
      style: {
        files: {
          "build/css/style.css": ["source/less/style.less"]
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'})
        ]
      },
      style: {
        src: "build/css/style.css"
      }
    },

    watch: {
      style: {
        files: ['source/less/**/*.less'],
        tasks: ['less', 'postcss', 'cssmin'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      
      html: {
        files: ['source/*.html'],
        tasks: ['copy:html'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      
      jscript: {
        files: ['source/js/*.js'],
        tasks: ['jsmin-sourcemap'],
        options: {
          spawn: false,
          livereload: true
        }
      }

    },
    
    clean: {
       build: ["build"]
    },
  
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "source",
          src: [
            "img/**",
            "js/**",
            "*.html"
          ],
          dest: "build"
        }]
      },
      
      html: {
        files: [{
          expand: true,
          cwd: "source",
          src: ["*.html"],
          dest: "build"
        }]
        
      }
    },
    
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png,jpg,gif,svg}"]
        }]
      }
    },
    
    cssmin: {
      options: {
        keepSpecialComments: 0,
        report: "gzip"
      },
      style: {
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },
    
    'jsmin-sourcemap': {
      all: {
        src: ['source/js/script.js'],
        dest: 'build/js/script.min.js'
      },
    }
      
  };
  
   grunt.registerTask("build", [
    "clean",
    "copy",
    "less",
    "postcss",
//    "imagemin",
    "cssmin",
    "jsmin-sourcemap"
  ]);

  config = require('./.gosha')(grunt, config);

  grunt.initConfig(config);
};
