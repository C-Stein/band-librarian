module.exports = function(grunt) {
 var mozjpeg = require('imagemin-mozjpeg');
 require('time-grunt')(grunt);
 
 grunt.initConfig({
   jshint: {
     files: ['../app/**/*.js']
   },
   sass: {
     dist: {
       files: {
         '../styles/main.css': '../sass/main.scss'
       }
     }
   },
   watch: {
     javascripts: {
       files: ['../app/**/*.js'],
       tasks: ['jshint']
     },
     sassy: {
       files: ['../sass/**/*.scss'],
       tasks: ['sass']
     }
   },
  plato: {
    your_task: {
      files: {
        './': ['../app/**/*.js']
      }
    }
  },
  imagemin: {                          // Task 
    static: {                          // Target 
      options: {                       // Target options 
        optimizationLevel: 3,
        svgoPlugins: [{ removeViewBox: false }],
        use: [mozjpeg()]
      },
      files: {                         // Dictionary of files 
        '../dist/shoe.jpg': '../src/shoe4.jpg', // 'destination': 'source' 
      }
    },
  }
 });

 require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 grunt.registerTask('default', ['jshint', 'sass', 'watch']);
 grunt.registerTask('lint', ['newer:jshint']);
};