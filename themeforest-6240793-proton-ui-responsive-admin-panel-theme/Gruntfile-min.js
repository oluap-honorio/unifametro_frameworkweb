// PROTON UI GRUNTFILE - MINIFIED VERSION BUILDER

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
            distmin: 'dist-minified'
        },
        clean: {
            distmin: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '.prebuild',
                        '<%= yeoman.distmin %>/*',
                        '!<%= yeoman.distmin %>/.git*'
                    ]
                }]
            },
            prebuild: '.prebuild'
        },
        rev: {      
            files: {
                src: [
                    '<%= yeoman.distmin %>/scripts/*.js',
                    '<%= yeoman.distmin %>/scripts/proton/*.js',
                    '<%= yeoman.distmin %>/styles/*.css'
                ]
            }
        },
        useminPrepare: {
            options: {
                dest: '<%= yeoman.distmin %>',
            },
            // html: '.prebuild/index.html'
            html: '.prebuild/*.html'
        },
        usemin: {
            options: {
                dirs: ['<%= yeoman.distmin %>'],
            },
            // html: ['<%= yeoman.distmin %>/index.html'],
            html: ['<%= yeoman.distmin %>/{,*/}*.html'],
            css: ['<%= yeoman.distmin %>/styles/*.css']
        },
        imagemin: {
            distmin: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.distmin %>/images'
                }]
            }
        },
        includereplace: {
            prebuildMin: {
                options: {
                    globals: {
                        buildjs: '<!-- build:js(app) scripts\\proton.js -->',
                        endbuild: '<!-- endbuild -->'
                    }
                },
                files: [
                    {src: 'base-scripts.html', dest: '<%= yeoman.app %>/common', expand: true, cwd: '<%= yeoman.app %>/common/template'},
                    {src: '*.html', dest: '.prebuild', expand: true, cwd: '<%= yeoman.app %>'}
                ]
            }
        },
        less: {
          distmin: {
            options: {
              yuicompress: true
            },
            files: {
              '<%= yeoman.app %>/styles/bootstrap.css': '<%= yeoman.app %>/less/bootstrap.less',
              '<%= yeoman.app %>/styles/proton.css': '<%= yeoman.app %>/less/proton.less'
            }
          }
        },

        copy: {
            distmin: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.distmin %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/**/*.{webp,gif}',
                        'styles/**/*.*',
                        'scripts/**/*.*'
                    ]
                }]
            },
            prebuildMin: {
                expand: true,
                dot: true,
                cwd: '.prebuild',
                dest: '<%= yeoman.distmin %>',
                src: '*.html'
            }
        },
        concurrent: {
            distmin: [
                'includereplace:prebuildMin',
                'less:distmin',
                'imagemin:distmin',
            ]
        }
    });

    grunt.registerTask('buildmin', [
        'clean:distmin',
        'concurrent:distmin',
        'useminPrepare',
        'copy:prebuildMin',
        'concat',
        'uglify',
        'copy:distmin',
        'rev',
        'usemin',
        'clean:prebuild'
    ]);

    grunt.registerTask('default', [
        'buildmin'
    ]);
};