'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var changeCase = require('change-case');
var del = require('del');
var merge = require('merge-stream');

var $ = require('gulp-load-plugins')({
  pattern: ['del']
});

gulp.task('clean', function (cb) {
  del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/'), path.join(conf.paths.src, '/i18n/')],cb);
  del([path.join(conf.paths.src, '/app/*'),path.join('!'+conf.paths.src, '/app/index.scss')],cb);
  del([path.join(conf.paths.src, '/static')],cb);
});
