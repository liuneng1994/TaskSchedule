/*eslint angular/no-private-call: [2,{"allow":["$$phase"]}]*/
/*eslint angular/no-services: [2,{"directive":["$http","$q"],"controller":["$resource"]}]*/
(function () {
  'use strict';

  angular.module('core')
    .factory('languageService', ['$http', '$q', 'configParam', LanguageService]);

  /** @ngInject */
  function LanguageService($http, $q, configParam) {
    var _ajaxUrl = configParam.apiEndPoint + "language";

    this.index = function () {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: _ajaxUrl + '/index',
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