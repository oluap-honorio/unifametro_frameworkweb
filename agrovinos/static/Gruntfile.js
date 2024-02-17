// PROTON UI GRUNTFILE - DEVELOPMENT VERSION BUILDER

// Generated on 2013-10-28 using generator-webapp 0.4.3
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // configurable paths
        yeoman: {
            app: 'app',
            dist: 'dist',
        },
        watch: {
            includereplace :{
                files: ['<%= yeoman.app %>/**/*.html'],
                tasks: ['includereplace:development']
            },
            less: {
                files: ['<%= yeoman.app %>/less/**/*.less'],
                tasks: ['less:development', 'copy:styles']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/**/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/**/*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    open: 'http://localhost:<%= connect.options.port %>',
                    base: [
                        '.tmp',
                        '<%= yeoman.app %>'
                    ]
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '.prebuild',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp',
            prebuild: '.prebuild'
        },
        rev: {      
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/*.js',
                        '<%= yeoman.dist %>/scripts/proton/*.js',
                        '<%= yeoman.dist %>/styles/*.css'
                    ]
                }
            }
        },
        useminPrepare: {
            options: {
                dest: '<%= yeoman.dist %>',
            },
            html: '.prebuild/*.html'
        },
        usemin: {
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        includereplace: {
            development: {
                options: {
                    globals: {
                        buildjs: '',
                        endbuild: ''
                    }
                },
                files: [
                    {src: 'base-scripts.html', dest: '<%= yeoman.app %>/common', expand: true, cwd: '<%= yeoman.app %>/common/template'},
                    {src: '*.html', dest: '.tmp', expand: true, cwd: '<%= yeoman.app %>'}
                ]
            },
            prebuild: {
                options: {
                    globals: {
                        buildjs: '',
                        endbuild: ''
                    }
                },
                files: [
                    {src: 'base-scripts.html', dest: '<%= yeoman.app %>/common', expand: true, cwd: '<%= yeoman.app %>/common/template'},
                    {src: '*.html', dest: '.prebuild', expand: true, cwd: '<%= yeoman.app %>'}
                ]
            },
        },
        less: {
          development: {
            files: {
              '<%= yeoman.app %>/styles/bootstrap.css': '<%= yeoman.app %>/less/bootstrap.less',
              '<%= yeoman.app %>/styles/proton.css': '<%= yeoman.app %>/less/proton.less'
            }
          },
          dist: {
            options: {
              yuicompress: true
            },
            files: {
              '<%= yeoman.app %>/styles/bootstrap.css': '<%= yeoman.app %>/less/bootstrap.less',
              '<%= yeoman.app %>/styles/proton.css': '<%= yeoman.app %>/less/proton.less'
            }
          }
        },

        // Put files not handled in other tasks here
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
                        'images/**/*.{webp,gif}',
                        'styles/**/*.*',
                        'less/**/*.*',
                        'scripts/**/*.*'
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
            prebuild: {
                expand: true,
                dot: true,
                cwd: '.prebuild',
                dest: '<%= yeoman.dist %>',
                src: '*.html'
            }
        },
        concurrent: {
            server: [
                'includereplace:development',
                'less:development',
                'copy:styles'
            ],
            dist: [
                'includereplace:prebuild',
                'less:development',
                'imagemin:dist',
            ]
        }
    });




    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'less:development',
            'concurrent:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dist',
        'useminPrepare',
        'copy:prebuild',
        'copy:dist',
        'usemin',
        'clean:prebuild'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};
