/*eslint angular/no-private-call: [2,{"allow":["$$phase"]}]*/
/*eslint angular/no-services: [2,{"directive":["$http","$q"],"controller":["$resource"]}]*/
(function () {
  'use strict';

  angular.module('core')
    .controller('MenuTopCtrl', [
      '$rootScope',
      'sessionService',
      MenuTopCtrl]);

  angular.module('core')
    .controller('MenuSideCtrl', [
      '$rootScope',
      'sessionService',
      MenuSideCtrl]);

  angular.module('core')
    .controller('MenuIndexCtrl', [
      '$rootScope',
      'resourceService',
      'menuService',
      MenuIndexCtrl]);



  /** @ngInject */
  function MenuTopCtrl($rootScope, sessionService) {
    var vm = this;
    this.menus = {};
    this.index = function () {
      sessionService.loadMyMenu().then(function (data) {
        vm.menus = angular.copy(data.top);
        vm.changeSideMenus(vm.menus[0].id);
      });
    };
    this.changeSideMenus = function (id) {
      $rootScope.$broadcast("selectmTopMenu", id);
    };

    this.index();
    return vm;
  }

  function MenuSideCtrl($rootScope, sessionService) {
    var vm = this;
    this.id;
    this.menus = [];
    
    this.index = function (id) {
      sessionService.loadMyMenu().then(function (data) {
        vm.menus = vm.findChildren(data, id);
      });
    };

    this.findChildren = function (data, id) {
      var menu = data[id];
      var result = [];
      angular.forEach(menu, function (value, key) {
        value.children = vm.findChildren(data, value.id);
        result.push(value);
      });
      return result;
    }

    $rootScope.$on('selectmTopMenu', function (event, id) {
      vm.id = id;
      vm.index(id);
    });

    this.index(1);
    return vm;
  }

  function MenuIndexCtrl($rootScope,resourceService,menuService) {
    var vm = this;
    this.isUpdate =false;
    this.menus=[];
    this.icons = [
      {
        "value":"fa fa-bars"
      },
      {
        "value":"fa fa-tachometer"
      },
      {
        "value":"fa fa-database"
      },
      {
        "value":"fa fa-desktop"
      },
      {
        "value":"fa fa-home"
      }
    ]
    this.create = function() {
      if(!angular.isNumber(vm.menu.odr)){
        vm.menu.odr=0;
      }
      menuService.create(vm.menu).then(function (msg) {
        alert("create " + msg);
        vm.reset();
      },function (msg) {
          alert("create " + msg); 
          vm.isError = $rootScope.errors.isError;
          vm.errorMessages = $rootScope.errors.errorMessages;
          vm.errors = $rootScope.errors.errorMap;
      });

    }

    this.reset = function () {
      this.isUpdate =false;
      vm.isError=false;
      vm.errorMessages = [];
      vm.errors =[];
      vm.initCreate();
    };


    this.expandNodeData = [];
    this.menuTree=[];
    this.treeOptions = menuService.treeOptions;

    this.initCreate = function() {
      //初始化树状数据
      vm.menu = angular.copy({});
      var promise = menuService.menuTree();
      promise.then(function(dataMap) { 
        vm.menuTree=dataMap.data;
        vm.expandNodeData=dataMap.expandNodeData;
      });
      //初始化下拉菜单
      promise = menuService.all();
      promise.then(function(data) { 
        vm.menus=data;
      });
      //初始化下拉资源（表示所有可用的资源--不包括自身选中的）
      promise = resourceService.available(-1);
      promise.then(function(data) { 
        vm.resources=data;
      });
    }

    this.initUpdate = function(id) {
        this.isUpdate =true;
        vm.isError=false;
        vm.errorMessages = [];
        vm.errors =[];
        //初始化树状数据
        var promise = menuService.menuTree();
        promise.then(function(dataMap) { 
          vm.menuTree=dataMap.data;
          vm.expandNodeData=dataMap.expandNodeData;
        });

        promise = menuService.edit(id);
        promise.then(function (data) {
          vm.menu = data;
          vm.oldMenu = angular.copy(vm.menu);
        });

        //初始化下拉菜单
        promise = menuService.parent(id);
        promise.then(function(data) {
          vm.menus=data;
        });

        //初始化下拉资源（表示所有可用的资源--包括自身选中的）
        promise = resourceService.available(id);
        promise.then(function(data) { 
          vm.resources=data;
        });
    }

    this.editMenu = function (id) {
      //变成新增
      if(vm.isUpdate&&vm.oldMenu.id == id){
        this.isUpdate =false;
        vm.reset()
      }else{      
        vm.initUpdate(id);
      }
    };

    this.update = function () {
      if(!angular.isNumber(vm.menu.odr)){
        vm.menu.odr=0;
      }
      menuService.update(vm.menu).then(function (msg) {
        alert("update " + msg);
        vm.initUpdate(vm.menu.id);
      },function (msg) {
          alert("create " + msg); 
          vm.isError = $rootScope.errors.isError;
          vm.errorMessages = $rootScope.errors.errorMessages;
          vm.errors = $rootScope.errors.errorMap;

      });
    };

    this.isChanged = function () {
      return angular.equals(vm.oldMenu, vm.menu);
    }

    this.isDeleted = function () {
        return !vm.menu.status;          
    }

    this.delete = function () {
      menuService.delete(vm.menu.id).then(function (msg) {
        alert("delete " + msg);
        vm.initUpdate(vm.menu.id);
      });
    };

    this.recovery = function () {
      menuService.recovery(vm.menu.id).then(function (msg) {
        alert("recovery " + msg);
        vm.initUpdate(vm.menu.id);
      });
    };

    this.reset();
    return this;
  }

})();
