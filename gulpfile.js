
'use strict';

var gulp = require('gulp');
var rollup = require('rollup-stream');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

//Compiling SASS
gulp.task('sass', function () {
  return gulp.src('assets/sass/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('assets/css'));
});

//Transpling JS with Babel
gulp.task('babel', function() {
  return rollup({entry: 'assets/js/src.js'}) 
      .pipe(source('assets/js/src.js'))
      .pipe(buffer())
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(rename('script.js'))
      .pipe(gulp.dest('assets/js'));              
});

gulp.task('js', ['babel'], function(){
    return gulp.src(['node_modules/angular/angular.js', 'node_modules/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js', 'node_modules/materialize-css/dist/js/materialize.min.js', 'assets/js/script.js'])
        .pipe(concat('script.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(rename('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'));
});
 

//Build task runs sass and js
gulp.task('build', ['sass', 'js']);

gulp.task('default', ['build'], function() {
  // Sass Watch
  gulp.watch(['assets/sass/**/*.scss'], ['sass']);

  // JS Watch
  gulp.watch(['assets/js/**/*.js'], ['js']);

});
