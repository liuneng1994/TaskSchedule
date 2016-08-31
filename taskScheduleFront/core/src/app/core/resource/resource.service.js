/*eslint angular/no-private-call: [2,{"allow":["$$phase"]}]*/
/*eslint angular/no-services: [2,{"directive":["$http","$q"],"controller":["$resource"]}]*/
(function () {
  'use strict';

  angular.module('core')
    .factory('resourceService', ['$http', '$q', 'configParam', ResourceService]);

  /** @ngInject */
  function ResourceService($http, $q, configParam) {
    var _ajaxUrl = configParam.apiEndPoint + "resource";

    this.available = function (id) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: _ajaxUrl + '/find/'+id,
        contentType: "application/json",
        dataType: 'JSON'
      }).success(function (data) {
        deferred.resolve(data);
      }).error(function (data) {
        deferred.reject(data);
      });
      return deferred.promise;
    };


    return this;
  }
})();