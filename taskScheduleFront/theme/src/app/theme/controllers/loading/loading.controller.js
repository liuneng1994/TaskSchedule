(function () {
  'use strict';

  angular.module('theme')
    .controller('LoadingCtrl', [
      '$timeout', '$state', 'OAuth','sessionService', '$log', 'configParam',
      LoadingCtrl]);

  /** @ngInject */
  function LoadingCtrl($timeout, $state, OAuth, sessionService, $log, configParam) {
    var vm = this;
    
    this.loading = function () {
      vm.isAuthenticated.then(function (data) {
        if (data) {
          $state.go(configParam.indexState);
        } else {
          $log.debug("need Login");
          sessionService.redirectLogin();
        }
      })
    }

    this.isAuthenticated = $timeout(function () {
      return OAuth.isAuthenticated();
    },1000);

    vm.loading();
    return this;
  }

})();
