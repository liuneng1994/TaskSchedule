/*eslint angular/no-private-call: [2,{"allow":["$$phase"]}]*/
/*eslint angular/no-services: [2,{"directive":["$http","$q"],"controller":["$resource"]}]*/
(function () {
  'use strict';

  angular.module('core')
    .service('organizationService', ['$http', '$q', 'httpApiService', OrganizationService]);


  /** @ngInject */
  function OrganizationService($http, $q, httpApiService) {
    this.read = function (params) {
      var deferred = $q.defer();
      httpApiService.get("/organization/index", {
        filters: params.data.filters,
        sort: params.data.sort,
        currentPage: params.data.page,
        pageSize: params.data.pageSize
      }).then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }
    this.edit = function (params) {
      var deferred = $q.defer();
      httpApiService.get("organization/" + params).then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }

    this.delete = function (params) {
      var deferred = $q.defer();
      httpApiService.put("organization/delete", params).then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }

    this.create = function (params) {
      var deferred = $q.defer();
      httpApiService.post("organization", params).then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }

    this.findParent = function (id) {
      if (id == "") {
        id = 0;
      }
      var deferred = $q.defer();
      httpApiService.get("organization/findParentById/" + id).then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }
    this.update = function (org) {
      var deferred = $q.defer();
      httpApiService.put("organization", org).then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }
    this.findUserByOrgId = function (params, id) {
      var deferred = $q.defer();
      httpApiService.get("organization/findUserByOrgId/" + id, {
        filters: params.data.filters,
        sort: params.data.sort,
        currentPage: params.data.page,
        pageSize: params.data.pageSize
      }).then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }
    this.findUserNoOrg = function () {
      var deferred = $q.defer();
      httpApiService.get("organization/findUserNoOrg").then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }
    this.createUsers = function (userIds, orgId) {
      var deferred = $q.defer();
      httpApiService.put("organization/createUsers", {userIds: userIds, orgId: orgId}).then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }
    this.deleteUsers = function (userIds) {
      var deferred = $q.defer();
      httpApiService.put("organization/deleteUsers", userIds).then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }

    this.findByParentId = function (id) {
      if (id == "") {
        id = 0;
      }
      var deferred = $q.defer();
      httpApiService.get("organization/findByParentId/" + id).then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }

    this.checkData= function(params) {
      var deferred = $q.defer();
      httpApiService.post("/organization/checkData",params).then(function(data){
        deferred.resolve(data);
      },function(error){
        deferred.reject(error);
      });
      return deferred.promise;
    }
  }

})();