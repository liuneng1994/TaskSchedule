(function () {
  'use strict';

  angular.module('core')
    .controller('UserIndexCtrl', [
      '$state',
      '$rootScope',
      'userService',
      UserIndexCtrl]);


  angular.module('core')
    .controller('UserAddCtrl', [
      '$rootScope',
      'userService',
      'languageService',
      'roleService',
      UserAddCtrl]);

  angular.module('core')
    .controller('UserEditCtrl', [
      '$rootScope',
      '$stateParams',
      'userService',
      'languageService',
      'roleService',
      UserEditCtrl]);

  /** @ngInject */
  function UserIndexCtrl($state,$rootScope,userService) {
    var vm = this;
    this.users = [];
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
        userService.index(currentPage, pageSize).then(function (data) {
          vm.users = angular.copy(data.list);
          pagination.totalItemCount = data.total;
          pagination.numberOfPages = data.pages;
        });
      }
      vm.isLoading = false;
    };

    this.delete = function (id) {
      userService.delete(id).then(function (msg) {
        alert("delete " + msg);
        $rootScope.$broadcast("delete a row", msg);
      });
    };

    this.edit = function (id) {
      $state.go("app.user.edit", {"id": id});
    }

    this.isEmpty = function() {
      if(vm.users == ""||vm.users.length == 0){
        return true;
      }else{
        return false;
      }
    }

    return vm;
  }

  function UserAddCtrl($rootScope,userService, languageService, roleService) {
    var vm = this;
    this.languages = [];
    this.selectedIds = [];
    this.add = function() {
      this.reset();
      languageService.index().then(function(data) {
        vm.languages = angular.copy(data);
      });
    }

    this.create = function() {
      var tmpRoles = []
      for(var item in vm.roles){
        if(vm.selectedIds.indexOf(vm.roles[item].id) != -1){
          tmpRoles.push(vm.roles[item])
        }
        vm.user.roles = tmpRoles;
      }
      userService.create(vm.user).then(
        function (msg) {
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
      vm.user = angular.copy({});
      vm.selectedIds = [];
      vm.user.languageId = "";
      vm.isError=false;
      vm.errorMessages = [];
      vm.errors =[];
    };

    this.open = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();
      vm.opened = true;
    };

    this.minDate = new Date('1950/01/01');
    this.dateOptions = {
      datepickerMode: 'year',
      formatMonth: 'MMMM',
      formatYear: 'yyyy',
      showWeeks: 'false',
      yearRows: '3',
      yearColumns: '3',
      startingDay: 1
    };
    this.format = 'yyyy/MM/dd';

    this.RoleDataSource = {
      transport: {
        read: function (options) {
          return roleService.findAll().then(function (data) {
            vm.roles = data;
            options.success(data);
          }, function (error) {
            options.error(error);
          });
        }
      }
    };

    this.selectOptions = {
      //placeholder: "Select products...",
      dataTextField: "name",
      dataValueField: "id",
      valuePrimitive: true,
      autoBind: false,
      dataSource: vm.RoleDataSource
    };

    this.add();
    return this;
  }

  function UserEditCtrl($rootScope,$stateParams, userService, languageService, roleService) {
    var vm = this;
    this.user = {};
    this.user.id = $stateParams.id;
    this.languages = [];
    this.selectedIds = [];

    this.edit = function (id) {
      userService.edit(id).then(function (data) {
        vm.user = data;
        vm.olduser = angular.copy(vm.user);
      });
      languageService.index().then(function(data) {
        vm.languages = angular.copy(data);
      });
      userService.findRoleIdsById(id).then(function (data) {
        vm.selectedIds = angular.copy(data);
        vm.oldSelectIds = angular.copy(data);
      });
    };

    this.edit(vm.user.id);

    this.update = function () {
      var tmpRoles = []
      for(var item in vm.roles){
        if(vm.selectedIds.indexOf(vm.roles[item].id) != -1){
          tmpRoles.push(vm.roles[item])
        }
        vm.user.roles = tmpRoles;
      }
      userService.update(vm.user,vm.selectedIds).then(function (msg) {
        alert("update " + msg);
        vm.olduser = angular.copy(vm.user);
        vm.oldSelectIds = angular.copy(vm.selectedIds);
        vm.isError=false;
        vm.errorMessages = [];
        vm.errors =[];
      },function (msg) {
          alert("create " + msg); 
          vm.isError = $rootScope.errors.isError;
          vm.errorMessages = $rootScope.errors.errorMessages;
          vm.errors = $rootScope.errors.errorMap;
      });
    };

    this.isChanged = function () {
      return angular.equals(vm.olduser, vm.user) && angular.equals(vm.oldSelectIds, vm.selectedIds)
    }
    this.reset = function () {
      vm.user = angular.copy(vm.olduser);
      vm.selectedIds = angular.copy(vm.oldSelectIds);
    };

    this.open = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();

      vm.opened = true;
    };

    this.minDate = new Date('1950/01/01');

    this.dateOptions = {
      datepickerMode: 'year',
      formatMonth: 'MMMM',
      formatYear: 'yyyy',
      showWeeks: 'false',
      yearRows: '3',
      yearColumns: '3',
      startingDay: 1
    };
    this.format = 'yyyy/MM/dd';

    this.RoleDataSource = {
      transport: {
        read: function (options) {
          return roleService.findAll().then(function (data) {
            vm.roles = data;
            options.success(data);
          }, function (error) {
            options.error(error);
          });
        }
      }
    };

    this.selectOptions = {
      //placeholder: "Select products...",
      dataTextField: "name",
      dataValueField: "id",
      valuePrimitive: true,
      autoBind: false,
      dataSource: vm.RoleDataSource
    };

    return this;
  }

})();
