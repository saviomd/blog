var autoprefixer = require('autoprefixer');
var autoprefixerConfig = require('autoprefixer-config-saviomd');
var concat = require('gulp-concat');
var cssnano = require('cssnano');
var cssnanoConfig = require('cssnano-config-saviomd');
var del = require('del');
var eslint = require('gulp-eslint');
var eslintConfig = require('eslint-config-saviomd');
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var stylelint = require('stylelint');
var stylelintConfig = require('stylelint-config-saviomd');
var stylestats = require('gulp-stylestats');
var stylestatsConfig = require('stylestats-config-saviomd');
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

gulp.task('buildCssVendor', function() {
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

gulp.task('lintCssSite', function() {
	return gulp.src('_src/css/_*.scss')
		.pipe(postcss([ stylelint(stylelintConfig) ]))
});

gulp.task('buildCssSite', ['lintCssSite'], function() {
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

gulp.task('buildJsVendor', function() {
	return gulp.src([
			'node_modules/jquery/dist/jquery.js',
			'node_modules/bootstrap/dist/js/bootstrap.js',
			'node_modules/wow/dist/wow.js'
		])
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('js'))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('js'))
});

gulp.task('buildJsSite', function() {
	return gulp.src([
			'_src/js/_header.js',
			'_src/js/_post.js',
			'_src/js/_footer.js',
			'_src/js/_tags.js',
			'_src/js/_noGa.js'
		])
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
	gulp.start('buildCssVendor', 'buildCssSite');
});

gulp.task('js', function(){
	gulp.start('buildJsVendor', 'buildJsSite');
});

gulp.task('dev', function() {
	gulp.watch('_src/css/*.scss', ['css'])
	gulp.watch('_src/js/*.js', ['js'])
});
