var gulp = require('gulp');

var browserify = require('browserify');

var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');

var livereload = require('gulp-livereload');

var paths = {
	scripts: ['js/**.js', 'js/**/**.js'],
	entry: ['./js/index.js']
};

gulp.task('compile', function() {
	return browserify({
			entries: paths.entry,
			extensions: ['.js'],
			debug: true
		})
		.transform('babelify', {
			presets: ['es2015', 'react']
		})
		.bundle()
		.on('error', function(e) {
			console.error(e.message);
			console.error(e.codeFrame);
			this.emit('end');
		})
		.pipe(source('dist.js'))
		.pipe(gulp.dest('./public'))
		.pipe(livereload());
});

gulp.task('real-watch', function() {
	livereload.listen({reloadPage: 'index.html'});
	gulp.watch(paths.scripts, ['compile']);
});

gulp.task('watch', ['compile', 'real-watch']);