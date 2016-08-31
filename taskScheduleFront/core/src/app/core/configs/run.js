(function () {
  'use strict';

  angular
    .module('core')
    .run([
      '$rootScope',
      '$state',
      '$stateParams',
      '$log',
      'configParam',
      'OAuth',
      'sessionService',
      runBlock
    ]);

  /** @ngInject */
  function runBlock($rootScope, $state, $stateParams, $log, configParam, OAuth, sessionService) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    //用户登录检查
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      $log.debug("current permission: front:" + toState.name);
      //非登录界面访问权限验证
      if (toState.name != configParam.loginState && toState.name!= 'loading') {
        sessionService.loadPublicPermission().then(function (publicPermission) {
          $log.debug("public Permission");
          $log.debug(publicPermission);
          if (publicPermission.indexOf(toState.name)<0) {
            sessionService.loadCurrentUser().then(function(currentUser){
              sessionService.loadMyPermission().then(function (myPermission) {
                $log.debug("my Permission");
                $log.debug(myPermission);
                if (myPermission.indexOf(toState.name)<0 && toState.name != configParam.denyState) {
                  $log.debug("need Deny");
                  $state.go(configParam.denyState);
                }
              })
            },function(error){
              $state.go('loading');
            });
          }
        });
      }

    });
    //服务器token错误
    $rootScope.$on("http.response.error.401", function (event, response) {
      event.preventDefault();
      $log.debug("http.response.error.401");
      $state.go(configParam.loginState);
    });
    /*$rootScope.$on("http.response.error.500", function (event, response) {
      event.preventDefault();
      $log.debug("http.response.error.500");
      $state.go(configParam.loginState);
    });*/

    $rootScope.$on('oauth:error', function (event, rejection) {
      // Ignore `invalid_grant` error - should be catched on `LoginController`.
      if ('invalid_grant' === rejection.data.error) {
        return;
      }

      // Refresh token when a `invalid_token` error occurs.
      if ('invalid_token' === rejection.data.error) {
        return OAuth.getRefreshToken();
      }

      // Redirect to `/login` with the `error_reason`.
      return $state.go(configParam.loginState);
    });

    $rootScope.$on('validateError', function (event, data) {
      var errorMap = {};
      var error = [];
      var fieldName = "";
      for (var i in data) {
        error = data[i];
        fieldName = error.field

        if (errorMap.hasOwnProperty(fieldName)) {
          errorMap[fieldName] += error.message + ";"
        } else {
          errorMap[fieldName] = error.message + ";"
        }
      }

      //console.log(errorMap)
      $rootScope.errors = {"isError": true, "errorMessages": data, "errorMap": errorMap};
    });
  }

})();
