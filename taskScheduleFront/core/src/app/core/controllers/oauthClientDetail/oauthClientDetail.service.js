(function() {
  'use strict';

  angular.module('core')
    .factory('oauthClientDetailService', ['$http', '$q','configParam', OauthClientDetailService]);


  /** @ngInject */
  function OauthClientDetailService($http, $q, configParam) {
    var _ajaxUrl = configParam.apiEndPoint+"oauthClientDetail";

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
        deferred.resolve('error');
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
        deferred.resolve('error');
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

    return this;
  }

})();
