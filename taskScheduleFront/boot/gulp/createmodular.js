'use strict';

var path = require('path');
var gulp = require('gulp');
var mkdirp = require('mkdirp');
var fs = require('fs');
var dir = ['assets','configs','controllers','i18n','interceptor','service','styles'];

function getItemsArr(o){
	var tmpArr = [];
        for(var item in o)
        {
            tmpArr.push(item);
        }
    return tmpArr;
};

function writeLazyloadJs(dirName,dirPath){
	var datas = ''
	/*var dataList = fs.readFileSync('../core/src/app/core/configs/lazyload.js', 'utf-8').split("\r\n");
	for(var i=0;i<=9;i++){
		if(i==3){
			datas = datas + "\tangular.module('"+dirName+"')";
		}else{
			datas = datas + dataList[i];
		}
		datas = datas + "\r\n";
	}
	datas = datas + "          ]\r\n        });\r\n\      }\r\n    ]);\r\n\r\n})();";*/
	datas += "(function() {\r\n  'use strict';\r\n\r\n  angular.module('";
	datas += dirName+"')\r\n    .config([\r\n      '$ocLazyLoadProvider', function ($ocLazyLoadProvider) {";
	datas += "\r\n        $ocLazyLoadProvider.config({\r\n          debug: true,\r\n          ";
	datas += "events: true,\r\n          modules: [\r\n";
	datas = datas + "          ]\r\n        });\r\n\      }\r\n    ]);\r\n\r\n})();";
	fs.writeFileSync(dirPath+'lazyload.js',datas);
};

function writeModuleJs(dirName,dirPath){
	var datas = ''
	/*var dataList = fs.readFileSync('../core/src/app/core/configs/module.js', 'utf-8').split("\r\n");
	for(var i=0;i<dataList.length;i++){
		if(i==4){
			datas = datas + "\t\t.module('"+dirName+"', [";
		}else{
			datas = datas + dataList[i];
		}
		datas = datas + "\r\n";
	}*/
	datas += "(function() {\r\n  'use strict';\r\n\r\n  angular\r\n    .module('";
	datas += dirName+"', [\r\n  ]);\r\n\r\n})();";
	fs.writeFileSync(dirPath+'module.js',datas);
};

function writeRouterJs(dirName,dirPath){
	var datas = ''
/*	var dataList = fs.readFileSync('../core/src/app/core/configs/router.js', 'utf-8').split("\r\n");
	for(var i=0;i<=11;i++){
		if(i==3){
			datas = datas + "\t\t.module('"+dirName+"')";
		}else{
			datas = datas + dataList[i];
		}
		datas = datas + "\r\n";
	}
	datas = datas + "\t}\r\n\r\n})();";*/
	datas += "(function () {\r\n  'use strict';\r\n  angular\r\n    .module('";
	datas += dirName+"')\r\n    .config([\r\n      '$stateProvider',\r\n      '$urlRouterProvider',";
	datas += "\r\n      routerConfig\r\n    ]);\r\n\r\n  /** @ngInject */\r\n";
	datas += "  function routerConfig($stateProvider, $urlRouterProvider) {";
	datas = datas + "\r\n\t}\r\n\r\n})();";
	fs.writeFileSync(dirPath+'router.js',datas);
};

function writeI18nJson(dirName,dirPath){
	fs.writeFileSync(dirPath+"../i18n/en_US.json","{\r\n}");
	fs.writeFileSync(dirPath+"../i18n/zh_CN.json","{\r\n}");
};

gulp.task('createmodular', function () {
	var dirName = getItemsArr(gulp.env)[1];
	var count = 0;
	if(dirName != null){
		for(var item in dir){
			mkdirp('../'+dirName+'/src/app/'+dirName+'/'+dir[item], function (err) {
			    if (err) console.error(err);
			    if(count == 6){
			    	var dirPath = '../'+dirName+'/src/app/'+dirName+'/configs/';
			    	writeLazyloadJs(dirName,dirPath);
			    	writeModuleJs(dirName,dirPath);
			    	writeRouterJs(dirName,dirPath);
			    	writeI18nJson(dirName,dirPath);
			    }
			    count++;
			});
		}
	}else{
		console.error("Missing directory name");
	}
});