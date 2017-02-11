module.exports = function ( grunt ) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-tslint');
	var taskConfig = {
		jshint: {
			src:['src/app/**/*.js','!node_modules/**/*.js'],
			options: {

			}
		},

		tslint: {
			src:['src/app/**/*.ts', '!node_modules/**/*.ts'],
			options: {

			}
		} 
	};
	grunt.initConfig(taskConfig);

	grunt.registerTask('default',['tslint']);
}
