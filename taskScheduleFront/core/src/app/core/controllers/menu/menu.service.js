/*eslint angular/no-private-call: [2,{"allow":["$$phase"]}]*/
/*eslint angular/no-services: [2,{"directive":["$http","$q"],"controller":["$resource"]}]*/
(function() {
  'use strict';

  angular.module('core')
    .factory('menuService', ['$http', '$q','configParam', 'sessionService','$rootScope', MenuService]);

 
  /** @ngInject */
  function MenuService($http, $q, configParam, sessionService) {
    var _ajaxUrl = configParam.apiEndPoint+"menu";
    this.treeOptions = {
        nodeChildren: "children",
        //dirSelectable:false,
        injectClasses: {

            iExpanded: " glyphicon glyphicon-folder-open",
            iCollapsed: "glyphicon glyphicon-folder-close",
            iLeaf: "glyphicon glyphicon-menu-hamburger"

        }
    }

/*    this.index = function(currentPage,pageSize) {
      var deferred = $q.defer();
      $http({
        method : 'GET',
        url : _ajaxUrl + '/index?currentPage='+currentPage+'&pageSize='+pageSize,
        contentType : "application/json",
        dataType : 'JSON'
      }).success(function(dataMap) {
        deferred.resolve(dataMap);
      }).error(function(dataMap) {  
        deferred.reject(dataMap);
      });
      return deferred.promise;
    };*/

    this.all = function() {
      var deferred = $q.defer();
      $http({
        method : 'GET',
        url : _ajaxUrl + '/all',
        contentType : "application/json",
        dataType : 'JSON'
      }).success(function(data) {
        deferred.resolve(data);
      }).error(function(data) {  
        deferred.reject(data);
      });
      return deferred.promise;
    };

    this.parent = function(id) {
      var deferred = $q.defer();
      $http({
        method : 'GET',
        url : _ajaxUrl + '/parent/'+id,
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
        url : _ajaxUrl + '/' + id ,
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

    this.recovery = function(id){
      var deferred = $q.defer();
      $http({
        method : 'GET',
        url : _ajaxUrl + '/recovery/' + id ,
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

    this.update = function(menu){
      var deferred = $q.defer();
      $http({
        method : 'PUT',
        url : _ajaxUrl,
        data : menu,
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

    this.create = function(menu){
      var deferred = $q.defer();
      $http({
        method : 'POST',
        url : _ajaxUrl,
        data : menu,
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
      }).success(function(dataMap) {
        deferred.resolve(dataMap);
      }).error(function(dataMap) {
        deferred.resolve('error');
      });  
      return deferred.promise;
    }


    this.tree = function() {
      var deferred = $q.defer();
      $http({
        method : 'GET',
        url : _ajaxUrl + '/tree',
        contentType : "application/json",
        dataType : 'JSON'
      }).success(function(dataMap) {
        deferred.resolve(dataMap);
      }).error(function(dataMap) {  
        deferred.reject(dataMap);
      });
      return deferred.promise;
    };

    this.menuTree = function() {
      var deferred = $q.defer();
      $http({
        method : 'GET',
        url : _ajaxUrl + '/menuTree',
        contentType : "application/json",
        dataType : 'JSON'
      }).success(function(dataMap) {
        deferred.resolve(dataMap);
      }).error(function(dataMap) {  
        deferred.reject(dataMap);
      });
      return deferred.promise;
    };
 
    return this;
  }

})();