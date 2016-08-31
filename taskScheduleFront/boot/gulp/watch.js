'use strict';

var path = require('path');
var os = require('os');
var gulp = require('gulp');
var conf = require('./conf');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();
var debug = require('gulp-debug');
var chokidar = require('chokidar');
var del = require('del');

function isOnlyChange(event) {
  return event.type === 'changed';
}

function changeModuleFile(filePath) {
  var moduleName = "";
  if (os.type() === "Windows_NT") {
    moduleName = filePath.split("\\")[1];
  } else {
    moduleName = filePath.split("/")[1];
  }
  return gulp.src(filePath, {base: '../' + moduleName + '/src/app/'})
    .pipe($.changed(conf.paths.src + '/app'))
    .pipe(gulp.dest(conf.paths.src + '/app/'));
}

function deleteModuleFile(filePath) {
  var moduleName = "";
  if (os.type() === "Windows_NT") {
    moduleName = filePath.split("\\")[1];
  } else {
    moduleName = filePath.split("/")[1];
  }
  return del(filePath.replace('../' + moduleName + '/', ''));
}

gulp.task('watch', ['inject', 'i18n:merge'], function () {

  gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'], ['inject-reload']);

  gulp.watch([
    path.join(conf.paths.src, '/app/**/*.css'),
    path.join(conf.paths.src, '/app/**/*.scss')
  ], function (event) {
    if (isOnlyChange(event)) {
      gulp.start('styles-reload');
    } else {
      gulp.start('inject-reload');
    }
  });

  gulp.watch(path.join(conf.paths.src, '/app/**/*.js'), function (event) {
    if (isOnlyChange(event)) {
      gulp.start('scripts-reload');
    } else {
      gulp.start('inject-reload');
    }
  });

  gulp.watch(path.join(conf.paths.src, '/app/**/*.html'), function (event) {
    browserSync.reload(event.path);
  });

  gulp.watch(path.join(conf.paths.src, '/app/**/i18n/**.json'), function (event) {
      gulp.start('i18n:merge');
  })

  var modulesStr = conf.paths.modules.map(function (mod) {
    return '../' + mod + '/' + conf.paths.src + '/app/**/*'
  })

  chokidar.watch(modulesStr)
  .on('add', path => {
    changeModuleFile(path);
  })
  .on('addDir', path => {
    changeModuleFile(path);
  })
  .on('change', path => {
    changeModuleFile(path);
  })
  .on('unlink', path => {
    deleteModuleFile(path);
  })
  .on('unlinkDir', path => {
    console.log('删除一个目录无法被监测到，请手动删除');
  })
  .on('error', error => {
    console.log('Watcher error: ${error}');
  });
});

