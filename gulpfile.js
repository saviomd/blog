var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var del = require('del');
var eslint = require('gulp-eslint');
var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var stylelint = require('stylelint');
var stylestats = require('gulp-stylestats');
var uglify = require('gulp-uglify');

/*
configurations
====================
- autoprefixer: https://github.com/postcss/autoprefixer#browsers
- eslint: https://github.com/eslint/eslint/blob/master/conf/eslint.json
- stylelint: https://github.com/stylelint/stylelint/tree/master/src/rules
- stylestats: https://github.com/t32k/stylestats/blob/master/assets/default.json
*/
var autoprefixerConfig = { browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'Android >= 2'] };
var stylestatsConfig = { config: '.stylestatsrc', outfile: true, type: 'json' };

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
		.pipe(autoprefixer(autoprefixerConfig))
		.pipe(gulp.dest('css'))
		.pipe(minifyCss())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('css'))
		.pipe(stylestats(stylestatsConfig))
		.pipe(gulp.dest('css'))
});

gulp.task('lintCssSite', function() {
	return gulp.src('_src/css/_*.scss')
		.pipe(postcss([
			stylelint()
		]))
});

gulp.task('buildCssSite', ['lintCssSite'], function() {
	return gulp.src('_src/css/blog.scss')
		.pipe(sass())
		.pipe(autoprefixer(autoprefixerConfig))
		.pipe(gulp.dest('css'))
		.pipe(minifyCss())
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
		.pipe(eslint())
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
