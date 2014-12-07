module.exports = function(grunt) {
  'use strict';

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("parallax-scroll.jquery.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.licenses[0].type %> License\n" +
				" */\n"
		},

		concat: {
			dist: {
				src: ["src/jquery.parallax-scroll.js"],
				dest: "dist/jquery.parallax-scroll.js"
			},
			demo: {
				src: ["src/jquery.parallax-scroll.js"],
				dest: "demo/js/jquery.parallax-scroll.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
      core: {
        src: 'src/*.js'
      },
      demo: {
        src: ['demo/js/*.js', '!demo/js/*.min.js']
      }
		},
    
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      demo: {
        options: {
          requireCamelCaseOrUpperCaseIdentifiers: null
        },
        src: 'demo/css/demo.css'
      }
    },

		uglify: {
			core: {
				src: ["dist/jquery.parallax-scroll.js"],
				dest: "dist/jquery.parallax-scroll.min.js"
			},
      demo_core: {
				src: ["demo/js/jquery.parallax-scroll.js"],
				dest: "demo/js/jquery.parallax-scroll.min.js"
      },
      demo: {
				src: ["demo/js/demo.js"],
				dest: "demo/js/demo.min.js"
      },
			options: {
        preserveComments: 'some',
				banner: "<%= meta.banner %>"
			}
		},

		watch: {
	    files: ['src/*', 'demo/js/*.js', '!demo/js/*.min.js', 'demo/css/*'],
	    tasks: ['default']
		}

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-csslint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("default", ["jshint", "csslint", "concat", "uglify"]);
	grunt.registerTask("travis", ["jshint"]);

};
