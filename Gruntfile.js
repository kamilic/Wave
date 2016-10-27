/**
 * Created by x on 2016/4/14.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        uglify: {
            build: {
                src: "dist/Wave.js",
                dest: "dist/Wave.min.js"
            }
        },
        copy: {
            build: {
                src: "src/*.js",
                dest: "dist/",
                flatten: true,
                expand: true
            }
        },
        jshint: {
            dev: {
                src: ['src/*.js'],
                options: {
                    browser: true,
                    devel: true,
                    esversion: 6
                }
            }
        },
        watch: {
            dev: {
                files: ['src/*.js'],
                tasks: ['jshint:dev']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('dev', ['jshint:dev', 'watch:dev']);
    grunt.registerTask('build', ['copy:build', 'jshint:dev', 'uglify:build']);

};

