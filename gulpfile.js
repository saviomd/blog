var autoprefixer = require('autoprefixer');
var autoprefixerConfig = require('tools-config-saviomd/autoprefixer-config');
var babel = require('gulp-babel');
var babelConfig = require('tools-config-saviomd/babel-config');
var concat = require('gulp-concat');
var cssnano = require('cssnano');
var cssnanoConfig = require('tools-config-saviomd/cssnano-config');
var del = require('del');
var eslint = require('gulp-eslint');
var eslintConfig = './node_modules/tools-config-saviomd/eslint-config.js';
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var stylelint = require('stylelint');
var stylelintConfig = require('tools-config-saviomd/stylelint-config');
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

gulp.task('cssLint', function() {
	return gulp.src('_src/css/_*.scss')
		.pipe(postcss([ stylelint(stylelintConfig) ]))
});

gulp.task('css', ['cssLint'], function() {
	return gulp.src('_src/css/blog.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([ autoprefixer(autoprefixerConfig), postcssFlexbugsFixes() ]))
		.pipe(gulp.dest('css'))
		.pipe(postcss([ cssnano(cssnanoConfig) ]))
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('css'))
});

gulp.task('jsLint', function() {
	return gulp.src('_src/js/_*.js')
		.pipe(eslint(eslintConfig))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
});

gulp.task('js', ['jsLint'], function() {
	return gulp.src(require('./_src/js/blog.js'))
		.pipe(sourcemaps.init())
		.pipe(babel(babelConfig))
		.pipe(concat('blog.js'))
		.pipe(gulp.dest('js'))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('js'))
});

/*
build tasks
====================
*/
gulp.task('default', ['clean'], function() {
	gulp.start('css', 'js');
});

gulp.task('dev', function() {
	gulp.watch('_src/css/*.scss', ['css'])
	gulp.watch('_src/js/*.js', ['js'])
});
