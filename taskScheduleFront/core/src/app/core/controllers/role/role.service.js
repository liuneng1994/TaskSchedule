/*eslint angular/no-private-call: [2,{"allow":["$$phase"]}]*/
/*eslint angular/no-services: [2,{"directive":["$http","$q"],"controller":["$resource"]}]*/
(function() {
  'use strict';

  angular.module('core')
    .factory('roleService', ['$http', '$q','$rootScope','configParam', 'httpApiService', RoleService]);

 
  /** @ngInject */
  function RoleService($http, $q, rootScope,configParam, httpApiService) {
    var _ajaxUrl = configParam.apiEndPoint+"role";

    this.treeOptions = {
          nodeChildren: "children",
          //dirSelectable:false,
          injectClasses: {

              iExpanded: " glyphicon glyphicon-folder-open",
              iCollapsed: "glyphicon glyphicon-folder-close",
              iLeaf: "glyphicon glyphicon-menu-hamburger"

          }
      }

    this.findAll = function(){
      var deferred = $q.defer();
      httpApiService.get("role/findAll").then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }

    this.index = function(currentPage,pageSize) {
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

    this.update = function(role,resourceIds){
      var deferred = $q.defer();
      $http({
        method : 'PUT',
        url : _ajaxUrl,
        data : {"role":role,
              "resourceIds":resourceIds},
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

    this.create = function(role,resourceIds){
      var deferred = $q.defer();
      $http({
        method : 'POST',
        url : _ajaxUrl,
        data : {"role":role,
              "resourceIds":resourceIds},
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
      }).success(function(dataMap) {
        deferred.resolve(dataMap);
      }).error(function(dataMap) {
        deferred.resolve('error');
      });  
      return deferred.promise;
    }

    this.isSelected = function(parentId,id,resourceIds){ 
      if(resourceIds.indexOf(parentId) != -1||resourceIds.indexOf(id)!= -1){ 
        return true;
      }else{
        return false;
      }
    } 

    this.isChidrenSelected = function(id,childrenIds,resourceIds){
          if(resourceIds.indexOf(id) != -1){              
            var idx = resourceIds.indexOf(id); 
            resourceIds.splice(idx,1);
          }


        for(var i in childrenIds){
          if(resourceIds.indexOf(childrenIds[i]) == -1){
            return {"resourceIds":resourceIds,"flag":false};
          }
        }

        if(resourceIds.indexOf(id) == -1){
            resourceIds.push(id)
        }

        return {"resourceIds":resourceIds,"flag":true};
      }

      this.updateSelection = function($event, id,childrenIds,resourceIds){


        var checkbox = $event.target; 
        var action = (checkbox.checked?'add':'remove'); 

        if(action == 'add' && resourceIds.indexOf(id) == -1){ 
          //加人自身id及未加入的子节点id
          resourceIds.push(id);

          for(var i in childrenIds){
            if(resourceIds.indexOf(childrenIds[i]) == -1){
              resourceIds.push(childrenIds[i]);
            }
          }
        }
        if(action == 'remove' && resourceIds.indexOf(id)!=-1){
          //移除自身id及加入的子节点id 
          var idx = resourceIds.indexOf(id); 
          resourceIds.splice(idx,1);

          for(var t in childrenIds){
            if(resourceIds.indexOf(childrenIds[t]) != -1){
              idx = resourceIds.indexOf(childrenIds[t]); 
              resourceIds.splice(idx,1);
            }
          }
        }

        return resourceIds;

      }


 
    return this;
  }

})();