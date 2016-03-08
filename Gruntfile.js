module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-coffee');

  var gruntConfig = grunt.file.readJSON('Gruntconfig.json');
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    cvars: gruntConfig.configVars,

    // angularfire

    yeoman: appConfig,

    coffee: {
      compileBlocknext: {
        options: {
          bare: false
        },
        files: {
          'blocknext/modules/home/index.js': 'blocknext/modules/home/index.coffee',
          'blocknext/services/product.js' : 'blocknext/services/product.coffee',
          'blocknext/interface.js'  : 'blocknext/interface.coffee',
          'blocknext/middleware.js' : 'blocknext/middleware.coffee',
          'blocknext/server.js'     : 'blocknext/server.coffee',
          'blocknext/start.js'      : 'blocknext/start.coffee',
          'blocknext/theme.js'      : 'blocknext/theme.coffee',
          'server/www.js'     : 'server/www.coffee'
          /*
           *'path/to/another.js': [
           *  'path/to/sources/*.coffee',
           *  'path/to/more/*.coffee'
           *]
           */
        }
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      www: {
        files: [
          '<%= cvars.app %>/**/*',
          'blocknext/**/*',
          'server/*'
        ],
        tasks: [
          'coffee:compileBlocknext'
        ],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },

    connect: {
      options: {
        port: 9000,
        hostname: 'localhost',
        livereload: 35729
      },
      server: {
        livereload: true,
        options: {
          port: gruntConfig.configVars.port,
          base: '<%= cvars.app %>'
        }
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/app/styles',
                connect.static('./app/styles')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      },
      build: {
        options: {
          jshintrc: '<%= cvars.app %>/js/jshintrc.json'
        },
        files: {
          src: [
            '<%= cvars.app %>/js/*.js',
            '<%= cvars.app %>/js/controller/*.js',
            '<%= cvars.app %>/js/directive/*.js',
            '<%= cvars.app %>/js/provider/*.js'
          ]
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      options: { force: true },
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      build: ['<%= cvars.build %>'],
      deploy: [
        '<%= cvars.dist %>/*'
      ],
      server: '.tmp'
    },

    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      server: {
        options: {
          map: true,
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      options: {
        cwd: ''
      },
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      },
      sass: {
        src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          sourcemap: true
        }
      }
    },

    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/images',
          '<%= yeoman.dist %>/styles'
        ]
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'styles/fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      setup: {
        files: [
          // Javascript with standard .min.js naming convention
          {
            cwd: 'bower_components', expand: true, flatten: true,
            dest: '<%= cvars.app %>/<%= cvars.appjs %>/ext/',
            src: gruntConfig.bowerFiles
          },
          // CSS with standard .min.css naming convention
          {
            cwd: 'bower_components', expand: true, flatten: true,
            dest: '<%= cvars.app %>/<%= cvars.appcss %>/ext/',
            src: gruntConfig.cssFiles
          }
        ]
      },
      build: {
        files: [
          {
            cwd: '<%= cvars.app %>/', expand: true,
            dest: '<%= cvars.build %>/',
            src: gruntConfig.buildFiles
          }
        ]
      },
      deploy: {
        files: [
          {
            cwd: '<%= cvars.build %>/', expand: true,
            dest: '<%= cvars.dist %>/',
            src: ['css/**', 'images/**', 'data/**']
          }
        ]
      }
    },

    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    // angularamd

    bower: {
      setup: {
        options: { install: true, copy: false }
      }
    },

    cssmin: {
      build: {
        files: {
          '<%= cvars.build %>/<%= cvars.appcss %>/style.css': [
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            '<%= cvars.app %>/<%= cvars.appcss %>/style.css'
          ]
        }
      }
    },
    preprocess: {
      build: {
        src : '<%= cvars.app %>/index.html',
        dest : '<%= cvars.build %>/index.build.html'
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      },
      // See https://github.com/yeoman/grunt-usemin/issues/44 for using 2 passes
      build: {
        options: {
          removeComments: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          // Cannot remove empty elements with angular directives
          removeEmptyElements: false
        },
        files: [
          { '<%= cvars.build %>/index.html': '<%= cvars.build %>/index.build.html' },
          {
            cwd: '<%= cvars.app %>/view/', expand: true, flatten: false,
            dest: '<%= cvars.build %>/view/',
            src: ['*.html']
          }
        ]
      },
      deploy: {
        options: {
          collapseWhitespace: true
        },
        files: [
          { '<%= cvars.dist %>/index.html': '<%= cvars.build %>/index.html' },
          {
            cwd: '<%= cvars.build %>/js/directive/template/', expand: true, flatten: false,
            dest: '<%= cvars.dist %>/js/directive/template/',
            src: ['*.html']
          },
          {
            cwd: '<%= cvars.build %>/view/', expand: true, flatten: false,
            dest: '<%= cvars.dist %>/view/',
            src: ['*.html']
          }
        ]

      }
    },
    requirejs: {
      build: {
        options: {
          baseUrl: '<%= cvars.app %>/js',
          mainConfigFile: '<%= cvars.app %>/js/main.js',
          removeCombined: true,
          findNestedDependencies: true,
          optimize: 'none',
          dir: '<%= cvars.build %>/js/',
          modules: [
            { name: 'main' },
            {
              name: 'controller/home_ctrl',
              exclude: ['main']
            },
            {
              name: 'controller/matches_ctrl',
              exclude: ['main']
            },
            {
              name: 'controller/match_ctrl',
              exclude: ['main']
            },
            {
              name: 'controller/players_ctrl',
              exclude: ['main']
            },
            {
              name: 'controller/player_ctrl',
              exclude: ['main']
            },
            {
              name: 'controller/teams_ctrl',
              exclude: ['main']
            },
            {
              name: 'controller/team_ctrl',
              exclude: ['main']
            }
          ]
        }
      }
    },
    uglify: {
      deploy: {
        options: {
          preserveComments: 'some'
        },
        files: [
          {
            cwd: '<%= cvars.build %>/js/', expand: true,
            dest: '<%= cvars.dist %>/js/',
            src: ['*.js', 'ext/require.js', 'controller/*.js']
          }
        ]
      }
    }

  });

  // angularfire

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'wiredep',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build/angularfire', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build/angularfire'
  ]);

  // angularamd

  /**
   * setup task
   * Run the initial setup, sourcing all needed upstream dependencies
   */
  grunt.registerTask('setup', ['bower:setup', 'copy:setup']);


  /**
   * devel task
   * Launch webserver and watch for changes
   */
  grunt.registerTask('devel', [
    //'connect:server',
    'watch:www'
  ]);


  /**
   * build task
   * Use r.js to build the project
   */
  grunt.registerTask('build/angularamd', [
    'jshint:build',
    'clean:build',
    'preprocess:build',
    'htmlmin:build',
    'cssmin:build',
    'requirejs:build',
    'copy:build'
  ]);


  /**
   * deploy task
   * Deploy to dist_www directory
   */
  grunt.registerTask('deploy', [
    'build/angularamd',
    'clean:deploy',
    'htmlmin:deploy',
    'uglify:deploy',
    'copy:deploy'
  ]);

  grunt.registerTask('ping', function () {
    grunt.log.write('ping: ', gruntConfig);
  });

};
