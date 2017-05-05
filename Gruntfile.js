module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'client/dist/bundle.js',
        dest: `build/4um.js`
      }
    },
    shell: {
      initialize: {
        command: 'npm run react-dev && npm run server-dev'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell')

  // Default task(s).
  grunt.registerTask('default', ['uglify'], ['shell']);
};