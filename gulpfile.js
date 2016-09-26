'use strict';

const
  babel = require('gulp-babel'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  rename = require('gulp-rename');

gulp.task('build', [
  'build:lib'
]);

gulp.task('build:lib', ['build:lib:es5', 'build:lib:umd', 'build:lib:systemjs', 'build:lib:es6']);
gulp.task('build:lib:es5', buildLibES5);
gulp.task('build:lib:umd', buildLibUMD);
gulp.task('build:lib:systemjs', buildLibSystemJS);
gulp.task('build:lib:es6', buildLibES6);

function buildLibES5() {
  return gulp
    .src('src/index.js')
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(rename({ basename: 'react-drop-to-upload.es5' }))
    .pipe(gulp.dest('dist'));
}

function buildLibUMD() {
  return gulp
    .src('src/index.js')
    .pipe(babel({
      presets: ['es2015', 'react'],
      plugins: ['transform-es2015-modules-umd']
    }))
    .pipe(rename({ basename: 'react-drop-to-upload.umd' }))
    .pipe(gulp.dest('dist'));
}

function buildLibSystemJS() {
  return gulp
    .src('src/index.js')
    .pipe(babel({
      presets: ['es2015', 'react'],
      plugins: ['transform-es2015-modules-systemjs']
    }))
    .pipe(rename({ basename: 'react-drop-to-upload.register' }))
    .pipe(gulp.dest('dist'));
}

function buildLibES6() {
  return gulp
    .src('src/index.js')
    .pipe(babel({
      presets: ['react']
    }))
    .pipe(rename({ basename: 'react-drop-to-upload.es6' }))
    .pipe(gulp.dest('dist'));
}
