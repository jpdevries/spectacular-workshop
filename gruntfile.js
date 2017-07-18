module.exports = function(grunt) {
  const pkg = grunt.file.readJSON('package.json');
  grunt.initConfig({
    pkg: pkg,
    dirs:{
      build:'./build/',
      static:'./static/',
      theme:'./public/',
      lib:'./lib/',
      assets:'./assets/',
      js:'./js/',
      css:'./css/',
      img:'./img/',
      scss:'src/scss/'
    },
    bower: {
        install: {
            options: {
                targetDir: './lib',
                layout: 'byComponent'
            }
        }
    },
    copy: {
      bower: {
        files: [{
            src: 'bourbon/**/*',
            cwd: '<%= dirs.lib %>',
            dest: '<%= dirs.scss %>',
            expand: true
        }, {
            src: 'neat/**/*',
            cwd: '<%= dirs.lib %>',
            dest: '<%= dirs.scss %>',
            expand: true
        }, {
            src: 'spec/**/*',
            cwd: '<%= dirs.lib %>spectacular/',
            dest: '<%= dirs.scss %>',
            expand: true
        }]
      }
    },
    sass:{
      dev: {
				options: {
					style: 'expanded',
					compass: false,
          sourcemap: true,
          sourceMapEmbed: true
				},
				files: {
					'<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>main.css': '<%= dirs.scss %>main.scss'
				}
			}
    },
    postcss: {
      options: {
        map: true, // inline sourcemaps

        // or
        map: {
            //inline: false, // save all sourcemaps as separate files...
            //annotation: 'dist/css/maps/' // ...to the specified directory
        },

        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
          require('postcss-custom-properties')({preserve: true})
          //require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: '<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>*.css'
      }
    },
    cssmin:{
      ship: {
        options:{
          report:'gzip'
        },
        files: {
            '<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>main.min.css': '<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>main.css'
        }
      },
    },
    watch: {
      scss: {
          options: {
              livereload: 35729
          },
          files: '<%= dirs.scss %>**/*.scss',
          tasks: ['sass:dev']
      }
    },
    clean: {
      buildcss: [
        '<%= dirs.build %><%= dirs.assets %><%= dirs.css %>*'
      ],
      themecss: [
        '<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>*'
      ]
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['watch:scss']);
  grunt.registerTask('buildcss',['sass','copy:bower','postcss','cssmin']);
  grunt.registerTask('build',['buildcss']);
};
