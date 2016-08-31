'use strict';

var gulp = require('gulp');

gulp.task('help', function () {
  console.log('gulp help                获取help');
  console.log('gulp bower               安装bower依赖');
  console.log('gulp module              将其他模块加载如主项目的 src/app 下');
  console.log('gulp watch               启动监测');
  console.log('gulp clean               清空dist, .tmp文件夹及app下除boot以外的所有模块');
  console.log('gulp serve               启动服务器');
  console.log('gulp serve:dist          启动打包后的程序');
  console.log('gulp build               build项目');
});