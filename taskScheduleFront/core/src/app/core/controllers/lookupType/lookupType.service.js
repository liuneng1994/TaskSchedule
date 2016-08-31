/*eslint angular/no-private-call: [2,{"allow":["$$phase"]}]*/
/*eslint angular/no-services: [2,{"directive":["$http","$q"],"controller":["$resource"]}]*/
(function() {
  'use strict';

  angular.module('core')
    .factory('lookupTypeService', ['$http', '$q','configParam', LookupTypeService]);

 
  /** @ngInject */
  function LookupTypeService($http, $q, configParam) {
    var _ajaxUrl = configParam.apiEndPoint+"lookupType";

    this.index = function(currentPage, pageSize){
      var deferred = $q.defer();
      $http({
        method : 'GET',
        url : _ajaxUrl + '/index?currentPage='+currentPage+'&pageSize='+pageSize,
        contentType : "application/json",
        dataType : 'JSON'
      }).success(function(data) {
        deferred.resolve(data);
      }).error(function(data) {  
        deferred.reject(data);
      });
      return deferred.promise;
    };

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

    this.update = function(user){
      var deferred = $q.defer();
      $http({
        method : 'PUT',
        url : _ajaxUrl,
        data : user,
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

    this.create = function(lookupType){
      var deferred = $q.defer();
      $http({
        method : 'POST',
        url : _ajaxUrl,
        data : lookupType,
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

    this.edit = function(id){
      var deferred = $q.defer();
      $http({
        method : 'GET',
        url : _ajaxUrl +  '/' + id,
        contentType : "application/json",
        dataType : 'JSON'
      }).success(function(data) {
        deferred.resolve(data);
      }).error(function(data) {
        deferred.resolve('error');
      });  
      return deferred.promise;
    }

    this.show = function(code){
      var deferred = $q.defer();
      $http({
        method : 'GET',
        url : _ajaxUrl +  '/show/' + code,
        contentType : "application/json",
        dataType : 'JSON'
      }).success(function(data) {
        deferred.resolve(data);
      }).error(function(data) {
        deferred.resolve('error');
      });  
      return deferred.promise;
    }
 
    return this;
  }

})();