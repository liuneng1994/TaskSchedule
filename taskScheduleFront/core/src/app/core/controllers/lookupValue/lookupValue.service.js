/*eslint angular/no-private-call: [2,{"allow":["$$phase"]}]*/
/*eslint angular/no-services: [2,{"directive":["$http","$q"],"controller":["$resource"]}]*/
(function() {
  'use strict';

  angular.module('core')
    .factory('lookupValueService', ['$http', '$q','configParam', LookupValueService]);

 
  /** @ngInject */
  function LookupValueService($http, $q, configParam) {
    var _ajaxUrl = configParam.apiEndPoint+"lookupValue";

    this.delete = function(id){
      var deferred = $q.defer();
      $http({
        method : 'DELETE',
        url : _ajaxUrl + '/' + id,
        contentType : "application/json"
      }).success(function(data) {
        if (data === 1) {
          deferred.resolve('ok');
        }
      }).error(function(data) {
        deferred.resolve('error');
      });  
      return deferred.promise;
    }

    this.update = function(lookupValue){
      var deferred = $q.defer();
      $http({
        method : 'PUT',
        url : _ajaxUrl,
        data : lookupValue,
        contentType : "application/json"
      }).success(function(data) {
        if (data === 1) {
          deferred.resolve('ok');
        }
      }).error(function(data) {
        deferred.reject('error');
      });  
      return deferred.promise;
    }

    this.create = function(lookupValue){
      var deferred = $q.defer();
      $http({
        method : 'POST',
        url : _ajaxUrl,
        data : lookupValue,
        contentType : "application/json",
        dataType : 'JSON'
      }).success(function(data) {
        if (data === 1) {
          deferred.resolve('ok');
        }
      }).error(function(data) {
        deferred.reject('error');
      });  
      return deferred.promise;
    }
 
    return this;
  }

})();