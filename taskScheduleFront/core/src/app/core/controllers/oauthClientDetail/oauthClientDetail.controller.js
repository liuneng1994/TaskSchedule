(function () {
  'use strict';

  angular.module('core')
    .controller('OauthClientDetailIndexCtrl', [
      '$state',
      '$rootScope',
      'oauthClientDetailService',
      OauthClientDetailIndexCtrl]);

  angular.module('core')
    .controller('OauthClientDetailAddCtrl', [
      'oauthClientDetailService',
      OauthClientDetailAddCtrl]);

  angular.module('core')
    .controller('OauthClientDetailEditCtrl', [
      '$stateParams',
      'oauthClientDetailService',
      OauthClientDetailEditCtrl]);

  /** @ngInject */
  function OauthClientDetailIndexCtrl($state,$rootScope,oauthClientDetailService) {
    var vm = this;
    this.oauthClientDetails = [];
    this.index = function (tableState) {
      vm.isLoading = true;
      var pagination = tableState.pagination;
      var currentPage;
      if (pagination.start === pagination.totalItemCount && pagination.start != 0) {
        currentPage = pagination.start / pagination.number ;
      } else {
        currentPage = pagination.start / pagination.number + 1 ;
      }
      var pageSize = pagination.number;
      if(angular.isNumber(currentPage) && angular.isNumber(pageSize)) {
        oauthClientDetailService.index(currentPage, pageSize).then(function (data) {
          vm.oauthClientDetails = angular.copy(data.list);
          pagination.totalItemCount = data.total;
          pagination.numberOfPages = data.pages;
        });
      }
      vm.isLoading = false;
    };

    this.delete = function (id) {
      oauthClientDetailService.delete(id).then(function (msg) {
        alert("delete " + msg);
        $rootScope.$broadcast("delete a row", msg);
      });
    };

    this.edit = function (id) {
      $state.go("app.oauthClientDetail.edit", {"id": id});
    }

    this.isEmpty = function() {
      if(vm.oauthClientDetails == ""||vm.oauthClientDetails.length == 0){
        return true;
      }else{
        return false;
      }
    }

    return vm;
  }

  function OauthClientDetailAddCtrl(oauthClientDetailService) {
    var vm = this;
    
    this.scopes = [{id: 1, value: "read"}, {id: 2, value: "write"}, {id: 3, value: "trust"}];
    this.authorities = [{id:1, value: "APP"}];
    this.resourceIds = [{id:1, value: "api-resource"}];
    this.grantTypes = [{id: 1, value: "password"}, {id: 2, value: "refresh_token"}, {id: 3, value: "authorization_code"}];
    this.selectScopes = [];
    this.selectAuthorities = [];
    this.selectResourceIds = [];
    this.selectGrantTypes = [];
    this.add = function() {
      this.reset();
    }

    this.create = function() {
      vm.oauthClientDetail.authorizedGrantTypes = vm.selectGrantTypes.toString();
      vm.oauthClientDetail.resourceIds = vm.selectResourceIds.toString();
      vm.oauthClientDetail.scope = vm.selectScopes.toString();
      vm.oauthClientDetail.authorities = vm.selectAuthorities.toString();
      oauthClientDetailService.create(vm.oauthClientDetail).then(function (msg) {
        alert("create " + msg);
      });
      vm.reset();
    }

    this.reset = function () {
      vm.oauthClientDetail = angular.copy({});
      vm.selectScopes = angular.copy({});
      vm.selectAuthorities = angular.copy({});
      vm.selectResourceIds = angular.copy({});
      vm.selectGrantTypes = angular.copy({});
      vm.oauthClientDetail.clientSecret = "secret";
    };

    this.add();
    return this;
  }

  function OauthClientDetailEditCtrl($stateParams, oauthClientDetailService) {
    var vm = this;
    this.oauthClientDetail = {};
    this.oauthClientDetail.id = $stateParams.id;
    this.oldOauthClientDetail = {};

    this.scopes = [{id: 1, value: "read"}, {id: 2, value: "write"}, {id: 3, value: "trust"}];
    this.authorities = [{id:1, value: "APP"}];
    this.resourceIds = [{id:1, value: "api-resource"}];
    this.grantTypes = [{id: 1, value: "password"}, {id: 2, value: "refresh_token"}, {id: 3, value: "authorization_code"}];
    this.selectScopes = [];
    this.selectAuthorities = [];
    this.selectResourceIds = [];
    this.selectGrantTypes = [];

    this.edit = function (id) {
      oauthClientDetailService.edit(id).then(function (data) {
        vm.setOld(data);
        vm.oldOauthClientDetail = angular.copy(data);
      });
    };

    this.edit(vm.oauthClientDetail.id);

    this.setOld = function (data) {
      vm.oauthClientDetail = angular.copy(data);
      vm.selectGrantTypes = data.authorizedGrantTypes.split(",");
      vm.selectResourceIds = data.resourceIds.split(",");
      vm.selectScopes = data.scope.split(",");
      vm.selectAuthorities = data.authorities.split(",");
    }

    this.update = function () {
      oauthClientDetailService.update(vm.oauthClientDetail).then(function (msg) {
        alert("update " + msg);
      });
      vm.setOld(vm.oauthClientDetail);
      vm.oldOauthClientDetail = angular.copy(vm.oauthClientDetail);
    };

    this.reset = function () {
      vm.setOld(vm.oldOauthClientDetail);
    };

    this.isChanged = function () {
      vm.oauthClientDetail.authorizedGrantTypes = vm.selectGrantTypes.toString();
      vm.oauthClientDetail.resourceIds = vm.selectResourceIds.toString();
      vm.oauthClientDetail.scope = vm.selectScopes.toString();
      vm.oauthClientDetail.authorities = vm.selectAuthorities.toString();
      return angular.equals(vm.oldOauthClientDetail, vm.oauthClientDetail);
    }

    return this;
  }
})();
