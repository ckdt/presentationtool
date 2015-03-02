module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
					'<%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			dist: {
				files: {
					'js/scripts.min.js': ['app/js/plugins.js', 'app/js/main.js']
				}
			}
		},
		less: {
			dev: {
				files: {
					'app/css/theme.css': 'app/less/theme.less',
					'app/css/admin.theme.css': 'app/less/admin.theme.less'
				}
			},
			dist: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					'css/theme.min.css': 'app/less/theme.less',
					'css/admin.theme.min.css': 'app/less/admin.theme.less'
				}
			}
		},
		watch: {
			less: {
				files: ['app/less/*'],
				tasks: 'less'
			},
			uglify: {
				files: ['app/js/*'],
				tasks: 'uglify'
			}
		},
		copy: {
			dist: {
				files: [
					{expand: true, cwd: 'app/js/vendor', src: ['*'], dest: 'js/vendor/'},
					{expand: true, cwd: 'app/img/', src: ['*'], dest: 'img/'},
					{expand: true, cwd: 'app/video/', src: ['*'], dest: 'video/'},
					{expand: true, cwd: 'app/fonts/', src: ['*'], dest: 'fonts/'},
					{expand: true, cwd: 'app/templates/', src: ['*'], dest: 'templates/'}
				]
			}
		},
		targethtml: {
			dist: {
				files: {
					'footer.php' : 'app/footer.php',
					'functions.php' : 'app/functions.php',
					'header.php' : 'app/header.php',
					'index.php' : 'app/index.php',
					'home.php' : 'app/home.php'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks('grunt-targethtml');
	grunt.registerTask('default', ['less', 'watch']);
	grunt.registerTask('build', ['less', 'uglify', 'copy', 'targethtml']);
};
