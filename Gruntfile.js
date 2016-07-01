module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            web: {
                options: {
                    separator: '\n\n'
                },
                src: [
                    'www/app/main.js',
                    'www/app/factory/**/*.js',
                    'www/app/service/**/*.js',
                    'www/app/repository/**/*.js',
                    'www/app/controller/**/*.js',
                    'www/app/directive/**/*.js',
                    'www/app/config.js'
                ],
                dest: 'www/dist/<%= pkg.version %>/<%= pkg.name %>.js'
            }
        },

        uglify: {
            web: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                src: 'www/dist/<%= pkg.version %>/<%= pkg.name %>.js',
                dest: 'www/dist/<%= pkg.version %>/<%= pkg.name %>.min.js'
            }
        },

        watch: {
            scripts: {
                files: [
                    'www/app/main.js',
                    'www/app/factory/**/*.js',
                    'www/app/service/**/*.js',
                    'www/app/repository/**/*.js',
                    'www/app/controller/**/*.js',
                    'www/app/directive/**/*.js',
                    'www/app/config.js'
                ],
                tasks: ['default']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify']);

};

