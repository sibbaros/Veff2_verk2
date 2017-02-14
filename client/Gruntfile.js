module.exports = function ( grunt ) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-tslint');

	var taskConfig = {
		jshint: {
			src:['src/app/**/*.js','!node_modules/**/*.js'],
			options: {
  				curly:  true,
  				immed:  true,
  				newcap: true,
  				noarg:  true,
  				sub:    true,
  				boss:   true,
  				eqnull: true,
  				node:   true,
  				undef:  true,
  			globals: {
    			_:       false,
    			jQuery:  false,
    			angular: false,
    			moment:  false,
    			console: false,
    			$:       false,
    			io:      false
  				}
 			}
		},

		tslint: {
			src:['src/app/**/*.ts', '!node_modules/**/*.ts'],
			options: {

			}
		},

		uglify: {
			build: {
				src: ['src/app/**/*.ts'],
				dest: ['build/min.ts']
			}
		} 
	};
	grunt.initConfig(taskConfig);

	grunt.registerTask('default',['tslint']);
	grunt.registerTask('minify', ['uglify']);
}
