'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var install = require("gulp-install");
var mainBowerFiles = require('main-bower-files');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var merge = require('gulp-merge-json');

gulp.task('bower:merge', function () {
  var modulesStr = conf.paths.modules.map(function (mod) {
    return '../' + mod + '/bower.json';
  })
  console.log(modulesStr);
  return gulp.src(modulesStr)
    .pipe(merge('bower.json', false, false, {'name': 'boot'}))
    .pipe(gulp.dest('./'));
});

gulp.task('bower:install', function () {
  return gulp.src('./bower.json')
    .pipe(install());
});


gulp.task('bower:copy', function () {
  var dependencies = mainBowerFiles();
  var devDependencies = mainBowerFiles({includeDev: true});

  for (var i = 0; i < devDependencies.length; i++) {
    for (var j = 0; j < dependencies.length; j++) {
      if (devDependencies[i] === dependencies[j]) {
        devDependencies.splice(i, 1);
        dependencies.splice(j, 1);
        i--;
        j--;
        break;
      }
    }
  }
  return gulp.src(devDependencies)
    .pipe($.filter('**/*.{js,css}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.src, '/lib')));

});
gulp.task('bower', function () {
  runSequence('bower:merge', 'bower:install', 'bower:copy');
});
