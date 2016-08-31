/*eslint angular/no-private-call: [2,{"allow":["$$phase"]}]*/
/*eslint angular/no-services: [2,{"directive":["$http","$q"],"controller":["$resource"]}]*/
(function () {
  'use strict';

  angular.module('core')
    .controller('LookupTypeIndexCtrl', [
      'lookupTypeService',
      '$rootScope',
      LookupTypeIndexCtrl
    ]);

  angular.module('core')
    .controller('LookupTypeAddCtrl', [
      'lookupTypeService',
      LookupTypeAddCtrl
    ]);

  angular.module('core')
    .controller('LookupTypeEditCtrl', [
      '$stateParams',
      'lookupTypeService',
      LookupTypeEditCtrl
    ]);

  angular.module('core')
    .controller('LookupTypeShowCtrl', [
      '$stateParams',
      'lookupTypeService',
      'lookupValueService',
      '$rootScope',
      'commonService',
      LookupTypeShowCtrl
    ]);

  /** @ngInject */
  function LookupTypeIndexCtrl(lookupTypeService, $rootScope) {
    var vm = this;
    this.lookupTypes = [];

    this.index = function (tableState) {
      vm.isLoading = true;
      var pagination = tableState.pagination;
      var currentPage;
      if (pagination.start === pagination.totalItemCount && pagination.start != 0) {
        currentPage = pagination.start / pagination.number;
      } else {
        currentPage = pagination.start / pagination.number + 1;
      }
      var pageSize = pagination.number;
      if (angular.isNumber(currentPage) && angular.isNumber(pageSize)) {
        lookupTypeService.index(currentPage, pageSize).then(function (data) {
          vm.lookupTypes = angular.copy(data.list);
          pagination.totalItemCount = data.total;
          pagination.numberOfPages = data.pages;
        });
      }
      vm.isLoading = false;
    };

    this.delete = function (row) {
      lookupTypeService.delete(row.id).then(function (msg) {
        alert("delete " + msg);
        if (msg == 'ok') {
          $rootScope.$broadcast("delete a row", msg);
        }
      });
    };

    this.isEmpty = function () {
      if (vm.lookupTypes == "" || vm.lookupTypes.length == 0) {
        return true;
      } else {
        return false;
      }
    }

    this.itemsByPage = 15;

    return vm;
  }

  function LookupTypeAddCtrl(lookupTypeService) {
    var vm = this;
    this.create = function () {
      lookupTypeService.create(vm.lookupType).then(function (msg) {
        alert("create " + msg);
      });
      vm.reset();
    }

    this.reset = function () {
      vm.lookupType = angular.copy({});
    };

    this.reset();
    return this;
  }

  function LookupTypeEditCtrl($stateParams, lookupTypeService) {
    var vm = this;
    this.lookupType = {};
    this.lookupType.id = $stateParams.id;

    this.edit = function (id) {
      lookupTypeService.edit(id).then(function (data) {
        vm.lookupType = data;
        vm.oldlookupType = angular.copy(vm.lookupType);
      });
    };

    this.edit(vm.lookupType.id);

    this.update = function () {
      lookupTypeService.update(vm.lookupType).then(function (msg) {
        alert("update " + msg);
        if (msg == 'ok') {
          vm.lookupType.version += 1;
        }
      });
      vm.oldlookupType = angular.copy(vm.lookupType);
    };

    this.isChanged = function (form) {
      return angular.equals(vm.oldlookupType, vm.lookupType) || form.$invalid;
    }
    this.reset = function () {
      vm.lookupType = angular.copy(vm.oldlookupType);
    };

    return this;
  }

  function LookupTypeShowCtrl($stateParams, lookupTypeService, lookupValueService, $rootScope, commonService) {
    var vm = this;
    this.lookupType = {};
    this.lookupType.code = $stateParams.code;
    this.lookupValues = [];

    /*		vm.lookupDataSource = {
     transport: {
     read: function(options) {
     return commonService.findLookupValues(options.data,$stateParams.code).then(function(data) {
     options.success(data);
     } , function(error) {
     options.error(error);
     });
     }
     }
     };

     vm.lookupValueOptions = {
     dataSource: vm.lookupDataSource,
     dataTextField: "name",
     dataValueField: "code"
     };*/


    this.index = function () {
      lookupTypeService.show(vm.lookupType.code).then(function (data) {
        vm.lookupType = data;
        vm.lookupValues = data.lookupValues;
      });
    };
    this.open = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();
      vm.opened = true;
    };
    this.delete = function (row) {
      lookupValueService.delete(row.id).then(function (msg) {
        alert("delete " + msg);
        $rootScope.$broadcast("delete a row", msg);
      });
    };

    this.addOrUpdate = function (row) {
      if (row.id == '') {
        lookupValueService.create(row).then(function (msg) {
          alert("create " + msg);
          vm.index();
        }, function (msg) {
          alert("create " + msg);
          vm.isError = $rootScope.errors.isError;
          vm.errorMessages = $rootScope.errors.errorMessages;
          vm.errors = $rootScope.errors.errorMap;
        });
      } else {
        var index = vm.lookupValues.indexOf(row);
        lookupValueService.update(row).then(function (msg) {
          alert("update " + msg);
          if (msg == 'ok') {
            row.version += 1;
            vm.lookupValues.splice(index, 1, row);
          }
        }, function (msg) {
          alert("create " + msg);
          vm.isError = $rootScope.errors.isError;
          vm.errorMessages = $rootScope.errors.errorMessages;
          vm.errors = $rootScope.errors.errorMap;
        });
      }

    };

    this.checkName = function (data, attr) {
      if (data == null || data == '') {
        return attr + " cannot be null !";
      }
    };
    this.addValue = function () {
      vm.inserted = {
        id: '',
        code: '',
        name: '',
        odr: 1,
        lookupTypeCode: vm.lookupType.code,
        description: ''
      };
      vm.lookupValues.push(vm.inserted);
    };
    this.cancel = function (row) {
      if (row.id == "") {
        vm.lookupValues.splice(vm.lookupValues.indexOf(row), 1);
      }
    };
    this.isValueEmpty = function () {
      if (vm.lookupValues == "" || vm.lookupValues.length == 0) {
        return true;
      } else {
        return false;
      }
    };
    return this;
  }

})();
