var autoprefixer = require('autoprefixer');
var autoprefixerConfig = require('tools-config-saviomd/autoprefixer-config');
var concat = require('gulp-concat');
var cssnano = require('cssnano');
var cssnanoConfig = require('tools-config-saviomd/cssnano-config');
var del = require('del');
var eslint = require('gulp-eslint');
var eslintConfig = require('tools-config-saviomd/eslint-config');
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var stylelint = require('stylelint');
var stylelintConfig = require('tools-config-saviomd/stylelint-config');
var stylestats = require('gulp-stylestats');
var stylestatsConfig = require('tools-config-saviomd/stylestats-config');
var uglify = require('gulp-uglify');

/*
tasks
====================
*/
gulp.task('clean', function(cb) {
	return del([
			'+(css|js)'
		], cb)
});

gulp.task('cssVendor', function() {
	return gulp.src('_src/css/vendor.scss')
		.pipe(sass())
		.pipe(postcss([ autoprefixer(autoprefixerConfig) ]))
		.pipe(gulp.dest('css'))
		.pipe(postcss([ cssnano(cssnanoConfig) ]))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('css'))
		.pipe(stylestats(stylestatsConfig))
		.pipe(gulp.dest('css'))
});

gulp.task('cssSiteLint', function() {
	return gulp.src('_src/css/_*.scss')
		.pipe(postcss([ stylelint(stylelintConfig) ]))
});

gulp.task('cssSite', ['cssSiteLint'], function() {
	return gulp.src('_src/css/blog.scss')
		.pipe(sass())
		.pipe(postcss([ autoprefixer(autoprefixerConfig) ]))
		.pipe(gulp.dest('css'))
		.pipe(postcss([ cssnano(cssnanoConfig) ]))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('css'))
		.pipe(stylestats(stylestatsConfig))
		.pipe(gulp.dest('css'))
});

gulp.task('jsVendor', function() {
	return gulp.src(require('./_src/js/vendor.js'))
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('js'))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('js'))
});

gulp.task('jsSite', function() {
	return gulp.src(require('./_src/js/blog.js'))
		.pipe(eslint(eslintConfig))
		.pipe(eslint.format())
		.pipe(concat('blog.js'))
		.pipe(gulp.dest('js'))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('js'))
});

/*
build tasks
====================
*/
gulp.task('default', ['clean'], function(){
	gulp.start('css', 'js');
});

gulp.task('css', function(){
	gulp.start('cssVendor', 'cssSite');
});

gulp.task('js', function(){
	gulp.start('jsVendor', 'jsSite');
});

gulp.task('dev', function() {
	gulp.watch('_src/css/*.scss', ['css'])
	gulp.watch('_src/js/*.js', ['js'])
});
