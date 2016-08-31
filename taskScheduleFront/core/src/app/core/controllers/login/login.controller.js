(function () {
  'use strict';

  angular.module('core')
    .controller('LoginCtrl', ['$state', '$log', 'sessionService', 'loginService', LoginCtrl]);

  /** @ngInject */
  function LoginCtrl($state, $log, sessionService, loginService) {
    var vm = this;
    this.loginUser = {
      username: "",
      password: ""
    };
    this.error;
    this.login = function () {
      vm.error = false;
      sessionService.login(vm.loginUser).then(function (response) {
        loginService.login().then(function (data) {
        })
        $state.go('loading');
        $log.debug(response);
      }, function (error) {
        vm.error = true;
        $log.error(error);
      });
    };

    this.keyup = function (event) {
      if (event.keyCode == 13) {
        vm.login();
      }
    }
    return this;
  }

})();
