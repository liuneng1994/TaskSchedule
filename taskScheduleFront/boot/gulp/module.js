'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var merge = require('merge-stream');
var changeCase = require('change-case');
var debug = require('gulp-debug');
var template = require('gulp-template');
var fs = require('fs');
var foreach = require('gulp-foreach');


var moduleFolders = fs.readdirSync(path.join(conf.paths.src, "../.."))
  .filter(function(file) {
    return file != "boot" && file.indexOf(".") < 0 && fs.statSync(path.join(conf.paths.src, "../..", file)).isDirectory();
  });
conf.paths.modules = moduleFolders;
console.info(conf.paths.modules);
gulp.task('findConfig',function(){
  if (process.argv.indexOf("--prod") !== -1) {
    return gulp.src([path.join(conf.paths.src, '/app/**/configs/module.config.prod.js'),'!**/app/core/configs/module.config.prod.js'],{ base: conf.paths.src}).pipe(foreach(function(stream, file){
      conf.paths.cofigs.push(path.relative(path.join(file.cwd, file.base), file.path));
      console.info(conf.paths.cofigs);
      return stream;
    }));
  } else {
    return gulp.src([path.join(conf.paths.src, '/app/**/configs/module.config.js'),'!**/app/core/configs/module.config.js'],{ base: conf.paths.src}).pipe(foreach(function(stream, file){
      conf.paths.cofigs.push(path.relative(path.join(file.cwd, file.base), file.path));
      console.info(conf.paths.cofigs);
      return stream;
    }));
  }
});
gulp.task('module', function() {
  var tasks = conf.paths.modules.map(function(mod) {
    return gulp.src(path.join('../', mod, 'src/app/', mod, '/**/*'))
      .pipe(debug({
        title: 'unicorn:'
      }))
      .pipe(gulp.dest(path.join(conf.paths.src, 'app', changeCase.lowerCase(mod)), {
        overwrite: true
      }));
  });
  var modulesStr = conf.paths.modules.map(function(mod) {
      return "'" + changeCase.lowerCase(mod) + "'";
    }).join(",");

    var loadModule = gulp.src(path.join(conf.paths.src, '../templates/module.js'))
      .pipe(template({
        modulesStr: modulesStr
      }))
      .pipe(gulp.dest(path.join(conf.paths.src, 'app/boot/configs'), {
        overwrite: true
      }));
      var copyStaticFile = conf.paths.modules.map(function(mod) {
        return gulp.src(path.join('../', mod, 'src/static/','**/*'))
          .pipe(debug({
            title: 'unicorn:'
          }))
          .pipe(gulp.dest(path.join(conf.paths.src, 'static'), {
            overwrite: true
          }));
      });
  return merge(tasks,copyStaticFile, loadModule);
});
gulp.task('module:create', function() {
  var modulesStr = conf.paths.modules.map(function(mod) {
    return "'" + changeCase.lowerCase(mod) + "'";
  }).join(",");

  return gulp.src(path.join(conf.paths.src, '../templates/module.js'))
    .pipe(template({
      modulesStr: modulesStr
    }))
    .pipe(gulp.dest(path.join(conf.paths.src, 'app/boot/configs'), {
      overwrite: true
    }));
});
