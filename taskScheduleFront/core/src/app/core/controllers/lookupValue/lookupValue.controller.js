/*eslint angular/no-private-call: [2,{"allow":["$$phase"]}]*/
/*eslint angular/no-services: [2,{"directive":["$http","$q"],"controller":["$resource"]}]*/
(function () {
  'use strict';

  angular.module('core')
    .controller('LookupValueAddCtrl', [
      '$stateParams',
      'lookupValueService',
      LookupValueAddCtrl]);

  /** @ngInject */

  function LookupValueAddCtrl($stateParams,lookupValueService) {
    var vm = this;
    var typeCode = $stateParams.code;
    this.create = function() {
      lookupValueService.create(vm.lookupValue).then(function (msg) {
        alert("create " + msg);
      });
      vm.reset();
    }

    this.reset = function () {
      vm.lookupValue = angular.copy({});
      vm.lookupValue.lookupTypeCode = typeCode;
    };

    this.open = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();
      vm.opened = true;
    };
    this.reset();
    return this;
  }

})();