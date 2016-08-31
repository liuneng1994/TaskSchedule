'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var merge = require('gulp-merge-json');

gulp.task('i18n:merge', function () {
  conf.paths.i18n.map(function (lang) {
    var jsonStr = conf.paths.modules.map(function (mod) {
      return '../' + mod + "/src/app/" + mod + '/i18n/' + lang + '.json';
    });
    return gulp.src(jsonStr)
      .pipe(merge( lang + '.json'))
      .pipe(gulp.dest('./src/i18n/'));
  })
});

gulp.task('i18n:dist', function () {
  conf.paths.i18n.map(function (lang) {
    var jsonStr = conf.paths.modules.map(function (mod) {
      return '../' + mod + "/src/app/" + mod + '/i18n/' + lang + '.json';
    });
    return gulp.src(jsonStr)
      .pipe(merge( lang + '.json'))
      .pipe(gulp.dest('./dist/i18n/'));
  })
});
