/*eslint angular/no-private-call: [2,{"allow":["$$phase"]}]*/
/*eslint angular/no-services: [2,{"directive":["$http","$q"],"controller":["$resource"]}]*/
(function () {
  'use strict';

  angular.module('core')
    .directive('paginationService', [PaginationService]);

  /** @ngInject */
  function PaginationService() {
    var service = this;
    this.tableState = {
      sort: {},
      search: {},
      pagination: {
        number: 10,
        start: 0,
        totalItemCount: 0
      }
    };


    return this;
  }
})();