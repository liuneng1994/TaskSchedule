(function() {
  'use strict';

  angular.module('core')
    .factory('passwordModifyService', ['$http', '$q','configParam','httpApiService', PasswordModifyService]);


  /** @ngInject */
  function PasswordModifyService($http, $q, configParam,httpApiService) {
    this.verifyPassword = function(oldValue) {
      var deferred = $q.defer();
      httpApiService.put("/userInfo/verifyPassword/"+oldValue).then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }
    this.updatePassword = function(newValue) {
      var deferred = $q.defer();
      httpApiService.put("/userInfo/updatePassword/"+newValue).then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }
   
    return this;
  }

})();
