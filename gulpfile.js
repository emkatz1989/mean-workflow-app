//load the plugins
var gulp       = require('gulp');
var less       = require('gulp-less');
var minifyCSS  = require('gulp-minify-css');
var rename     = require('gulp-rename');
var jshint     = require('gulp-jshint');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');


//define a task called css
gulp.task('css', function() {

	//grab the less file, process the LESS, save to style.css
	return gulp.src('public/assets/css/style.less')
	   .pipe(less())
	   .pipe(minifyCSS())
	   .pipe(rename({ suffix: '.min' }))
	   .pipe(gulp.dest('public/assets/css'));
});

//task for js files
gulp.task('js', function() {

	return gulp.src(['server.js', 'public/app/*.js', 'public/app/**/*.js'])
	  .pipe(jshint())
	  .pipe(jshint.reporter('default'));
});

//task for scripts
gulp.task('scripts', function(){
	return gulp.src(['public/app/*.js', 'public/app/**/*.js'])
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('public/dist'));
});

//task for minifying angular files

gulp.task('angular', function(){
	return gulp.src(['public/app/*.js', 'public/app/**/*.js'])
	  .pipe(jshint())
	  .pipe(jshint.reporter('default'))
	  .pipe(ngAnnotate())
	  .pipe(concat('app.js'))
	  .pipe(uglify())
	  .pipe(gulp.dest('public/dist'));
});
