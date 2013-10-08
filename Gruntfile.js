module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['scripts/**/*.js','scripts/*.js'],
        dest: 'scripts/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      build: {
        src: 'scripts/<%= pkg.name %>.js',
        dest: 'scripts/<%= pkg.name %>.min.js'
      },
      dist: {
        files: {
          'scripts/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    less:{
      development: {
        options: {
          paths: ["styles/"]
        },
        files: {
          "styles/main.css" : "styles/main.less"
        }
      }
    },
    watch: {
      files: ['**/*.less'],
      tasks: ['less'],
      options: {
        debounceDelay: 1000
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['less', 'watch', 'concat', 'uglify']);

};
