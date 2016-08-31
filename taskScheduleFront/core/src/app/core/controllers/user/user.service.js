(function() {
  'use strict';

  angular.module('core')
    .factory('userService', ['$http', '$q','configParam', 'httpApiService',UserService]);


  /** @ngInject */
  function UserService($http, $q, configParam, httpApiService) {
    var _ajaxUrl = configParam.apiEndPoint+"user";

    this.findRoleIdsById = function(params){
      var deferred = $q.defer();
      httpApiService.get("user/findRoleIdsById/"+params).then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }

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
          deferred.resolve('ok');
      }).error(function(data) {
        deferred.reject('error');
      });
      return deferred.promise;
    }

    this.create = function(user){
      var deferred = $q.defer();
      $http({
        method : 'POST',
        url : _ajaxUrl,
        data : user,
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
        deferred.reject('error');
      });
      return deferred.promise;
    }

    this.getCurrentUser = function(id){
      var deferred = $q.defer();
      $http({
        method : 'GET',
        url : _ajaxUrl +  '/current',
        contentType : "application/json",
        dataType : 'JSON'
      }).success(function(data) {
        deferred.resolve(data);
      }).error(function(data) {
        deferred.reject('error');
      });
      return deferred.promise;
    }

    return this;
  }

})();
