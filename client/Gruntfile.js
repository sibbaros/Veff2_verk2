module.exports = function ( grunt ) {
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-tslint');

	var taskConfig = {

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
	//grunt.registerTask('minify', ['uglify']);
}
