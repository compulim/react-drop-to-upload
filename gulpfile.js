'use strict';

const
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  path = require('path'),
  webpack = require('webpack-stream');

const
  OUTPUT_DIR = path.join(__dirname, 'dist'),
  WEBPACK_CONFIG = require('./webpack.config');

gulp.task('build', [
  'build:content',
  'build:webpack'
]);

gulp.task('build:content', buildContent);
gulp.task('build:webpack', buildWebpack);

function buildContent() {
  return gulp
    .src(path.join(__dirname, 'examples/**/*.html'))
    .pipe(gulp.dest(OUTPUT_DIR));
}

function buildWebpack() {
  return gulp
    .src([])
    .pipe(webpack(WEBPACK_CONFIG))
    .pipe(gulp.dest(OUTPUT_DIR));
}
