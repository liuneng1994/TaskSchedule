'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var debug = require('gulp-debug');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

var browserSync = require('browser-sync');

gulp.task('inject-reload', ['inject'], function() {
  browserSync.reload();
});

gulp.task('inject', ['scripts', 'styles'], function() {
  var injectStyles = gulp.src([
    path.join(conf.paths.src, '/app/*/styles/kendo.common-bootstrap.min.css'),
    path.join(conf.paths.src, '/app/*/styles/*.css'),
    path.join(conf.paths.tmp, '/serve/app/**/*.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
  ], {
    read: false
  });

  var injectSrc = [
    path.join(conf.paths.src, '/app/**/*.module.js'),
    path.join(conf.paths.src, '/app/**/*.js'),
    path.join('!' + conf.paths.src, '/app/**/*.controller.js'),
    // path.join('!' + conf.paths.src, '/app/**/*.service.js'),
    path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
    path.join('!' + conf.paths.src, '/app/**/*.mock.js'),
  ];

  if (process.argv.indexOf("--prod") !== -1) {
    injectSrc.push(path.join('!' + conf.paths.src, '/app/**/module.config.js'));
    if(conf.paths.cofigs.length>0){
      console.info(conf.paths.cofigs);
      injectSrc.push(path.join('!'+conf.paths.src, '/app/core/**/module.config.prod.js'));
    }
    console.info("-----Prod Env-----");

  } else {
    injectSrc.push(path.join('!' + conf.paths.src, '/app/**/module.config.prod.js'));
    if(conf.paths.cofigs.length>0){
      console.info(conf.paths.cofigs);
      injectSrc.push(path.join('!'+conf.paths.src, '/app/core/**/module.config.js'));
    }
    console.info("-----Dev Env-----");
  }

  var injectScripts = gulp.src(injectSrc)
    .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});
