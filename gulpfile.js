"use strict";

var gulp = require('gulp'),
    babelify = require('babelify'),
    //browserify = require('browserify'),
    //source = require('vinyl-source-stream'),
    //buffer = require('vinyl-buffer'),
    //stylus = require('gulp-stylus'),
    //sourcemaps = require('gulp-sourcemaps'),
    //uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    //webserver = require('gulp-webserver');
    exec = require('gulp-exec');

// gulp.task('build-js', function(){
//     // browserify({
//     //    entries: ['./lib/bin/index.js'],
//     //    debug: true
//     // })
//     gulp.src('./lib/bin/index.js')
//     .transform(babelify)
//     .bundle()
//     .pipe(source('app.bundle.js'))
//     .pipe(gulp.dest('./dist'));
// });

gulp.task('watch', function(){
    gulp.watch('lib/**/*.js', [/*'build-js'*/, 'compress']);
});

gulp.task('compress', ['build-js'], function() {
  return gulp.src('dist/app.bundle.js')
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify({
        mangle: false,
        preserveComments: "license",
        outSourceMap: true
    }))
    .pipe(rename({
        extname: '.min.js'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['watch']);
//gulp.task('dev', ['default', 'dev-mode']);
