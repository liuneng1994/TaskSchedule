/*eslint angular/no-private-call: [2,{"allow":["$$phase"]}]*/
/*eslint angular/no-services: [2,{"directive":["$http","$q"],"controller":["$resource"]}]*/
(function() {
  'use strict';

  angular.module('core')
    .controller('RoleIndexCtrl', [
      '$state',
      '$rootScope',
      'roleService',
      RoleIndexCtrl]);

  angular.module('core')
    .controller('RoleAddCtrl', [
      '$translate',
      'roleService',
      'menuService',
      RoleAddCtrl]);

  angular.module('core')
    .controller('RoleEditCtrl', [
      '$stateParams',
      '$translate',
      'roleService',
      'menuService',
      RoleEditCtrl]);

  /** @ngInject */
  function RoleIndexCtrl($state,$rootScope,roleService) {
    var vm = this;
    this.roles = [];
    this.index = function (tableState) {
      vm.isLoading = true;
      var pagination = tableState.pagination;
      var currentPage;
      if (pagination.start === pagination.totalItemCount && pagination.start != 0) {
        currentPage = pagination.start / pagination.number ;
      } else {
        currentPage = pagination.start / pagination.number + 1 ;
      }
      var pageSize = pagination.number;
      if(angular.isNumber(currentPage) && angular.isNumber(pageSize)) {
        roleService.index(currentPage, pageSize).then(function (dataMap) {
          vm.roles = dataMap.list;
          vm.users = angular.copy(dataMap.list);
          pagination.totalItemCount = dataMap.total;
          pagination.numberOfPages = dataMap.pages;
        });
      }

       vm.isLoading = false;
    };

    this.delete = function (id) {
      roleService.delete(id).then(function (msg) {
        alert("delete " + msg);
        $rootScope.$broadcast("delete a row", msg);
      });
    };

    this.edit = function(id){
      $state.go("app.role.edit",{id:id});
    }

    this.isEmpty = function() {
      if(vm.roles == ""||vm.roles.length == 0){
        return true;
      }else{
        return false;
      }
    }

    this.roles = [];
    this.itemsByPage = 15;

    return vm;
  }

  function RoleAddCtrl($translate,roleService,menuService) {
      var vm = this;
      this.resourceIds = [];
      this.expandNodeData = [];

      this.create = function() {
        if(vm.resourceIds==""||vm.resourceIds.length==0){
          vm.errorMsg = "core.error.resource.empty";
          $translate(vm.errorMsg).then(function (translatedValue) {
            alert(translatedValue);
          });
          
          return;
        }
        roleService.create(vm.role,vm.resourceIds).then(function (msg) {
          alert("create " + msg);
        });
        vm.reset();
      }

      this.reset = function() {
        vm.role = angular.copy({});
        vm.resourceIds = []; 
      };

      this.reset();

      this.treeOptions = roleService.treeOptions;

      this.tree = function() {
        var promise = menuService.tree();
        promise.then(function(dataMap) { 
          vm.menuTree=dataMap.data;
          vm.expandNodeData=dataMap.expandNodeData;
        });
      }

      //被选中的资源id
      this.updateSelection = function($event, id,childrenIds){
         vm.resourceIds = roleService.updateSelection($event, id,childrenIds,vm.resourceIds)
      }

      //是否父节点被选中,或者自己被选中
      this.isSelected = function(parentId,id){ 
          return roleService.isSelected(parentId,id,vm.resourceIds);
      } 

      //判断子节点是否都被选中了
      this.isChidrenSelected = function(id,childrenIds){
          var data = roleService.isChidrenSelected(id,childrenIds,vm.resourceIds)
          vm.resourceIds = data.resourceIds;

          return data.flag;
      }


      this.tree();
      return vm;
  }

  function RoleEditCtrl($stateParams,$translate, roleService,menuService) {
      var vm = this;
      this.role = {};
      this.resourceIds = [];
      this.role.id = $stateParams.id;
      this.oldrole = {};
      this.oldResourceIds = [];
      this.expandNodeData = [];

      this.init = function(){
        var promise = roleService.edit(vm.role.id);
        promise.then(function(dataMap) { 
          vm.role = dataMap.role;
          vm.resourceIds = dataMap.resourceIds;
          vm.oldrole = angular.copy(vm.role);
          vm.oldResourceIds = angular.copy(vm.resourceIds);
        });
      };
      this.init();

      this.update= function() {
        if(vm.resourceIds==""||vm.resourceIds.length==0){
          vm.errorMsg = "core.error.resource.empty"
          $translate(vm.errorMsg).then(function (translatedValue) {
            alert(translatedValue);
          });
          return;
        }
        var promise = roleService.update(vm.role,vm.resourceIds);
        promise.then(function(msg) { 
          alert("update " + msg);
        });
        vm.oldrole = angular.copy(vm.role);
      };
      
      this.isChanged = function () {
        return angular.equals(vm.oldrole, vm.role)&&angular.equals(vm.oldResourceIds, vm.resourceIds);
      }
      this.reset = function() {
        vm.role = angular.copy(vm.oldrole);
        vm.resourceIds = angular.copy(vm.oldResourceIds);
      };

      this.treeOptions = roleService.treeOptions;

      this.tree = function() {
        var promise = menuService.tree();
        promise.then(function(dataMap) { 
          vm.menuTree=dataMap.data;
          vm.expandNodeData=dataMap.expandNodeData;
        });
      }

       //被选中的资源id
      this.updateSelection = function($event, id,childrenIds){
         vm.resourceIds = roleService.updateSelection($event, id,childrenIds,vm.resourceIds)
      }

      //是否父节点被选中,或者自己被选中
      this.isSelected = function(parentId,id){ 
          return roleService.isSelected(parentId,id,vm.resourceIds);
      } 

      //判断子节点是否都被选中了
      this.isChidrenSelected = function(id,childrenIds){
          var data = roleService.isChidrenSelected(id,childrenIds,vm.resourceIds)
          vm.resourceIds = data.resourceIds;

          return data.flag;
      }
      

      this.tree();
      return vm;

    }

})();