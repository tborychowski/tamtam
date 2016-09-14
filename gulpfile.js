const gulp = require('gulp');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const less = require('gulp-less');
const path = require('path');
const concat = require('gulp-concat');
const webpack = require('gulp-webpack');


gulp.task('js', (done) => {
	return gulp.src(['src/index.js'])
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest('public'));
});


gulp.task('css', () => {
	return gulp.src('css/**/*.less')
		.pipe(less({
			paths: [path.join(__dirname, 'css')]
		}))
		.pipe(concat('index.css'))
		.pipe(gulp.dest('public'));
});

gulp.task('default', ['js', 'css'],() => {
	gulp.watch('src/**/*.js', ['js']);
	gulp.watch('css/**/*.less', ['css']);
});
