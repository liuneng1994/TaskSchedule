(function () {
  'use strict';

  angular.module('core')
    .controller('PasswordModifyCtrl', [
      '$state',
      '$filter',
      'configParam',
      'passwordModifyService',
      PasswordModifyCtrl]);

  /** @ngInject */
  function PasswordModifyCtrl($state, $filter, configParam, passwordModifyService) {

    var vm = this;
    vm.isVerified = false;

    this.verifyPassword = function () {
      if (angular.isDefined(vm.oldValue) && vm.oldValue != "") {
        passwordModifyService.verifyPassword(vm.oldValue).then(function (data) {
          vm.isVerified = data;
        });
      }
    }
    this.updatePassword = function () {
      passwordModifyService.updatePassword(vm.newValue).then(function (data) {
        vm.isModified = data;
        alert($filter('translate')('core.userInfo.passwordModification.reLogin'));
        $state.go(configParam.loginState);
      });
    }
    this.verify = function () {
      return vm.oldValue === "" || angular.isUndefined(vm.oldValue);
    }

    this.isEqual = function (val1, val2) {
      if (angular.isDefined(val1) && val1 != "") {
        if (angular.isDefined(val2) && val2 != "") {
          return val1 === val2;
        }
        return false;
      }
      return false;
    }

    return vm;
  }

})();
