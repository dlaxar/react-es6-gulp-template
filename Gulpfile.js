var gulp = require('gulp');

var browserify = require('browserify');

var babelify = require('babelify');
var source = require('vinyl-source-stream');

var livereload = require('gulp-livereload');

var paths = {
	scripts: ['js/**.js', 'js/**/**.js'],
	entry: ['./js/index.js']
};

gulp.task('compile', function() {
	return browserify({
			entries: paths.entry,
			extensions: ['.js']
		})
		.transform(babelify.configure({
			presets: ['es2015', 'react']
		}))
		.bundle()
		.pipe(source('dist.js'))
		.pipe(gulp.dest('./public'))
		.pipe(livereload());
});

gulp.task('real-watch', function() {
	livereload.listen({reloadPage: 'index.html'});
	gulp.watch(paths.scripts, ['compile']);
});

gulp.task('watch', ['compile', 'real-watch']);