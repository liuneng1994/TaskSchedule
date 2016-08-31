(function () {
  'use strict';

  angular.module('core').factory('myOauthInterceptor', ['$injector', '$q', '$rootScope', '$log', 'OAuthToken', '$translate', 'configParam', function ($injector, $q, $rootScope, $log, OAuthToken, $translate, configParam) {
    return {
      request: function (config) {
        config.headers = config.headers || {};

        // Inject `Authorization` header.
        if (configParam.loginType == "oauth" && !config.headers.hasOwnProperty('Authorization') && OAuthToken.getAuthorizationHeader()) {
          config.headers.Authorization = OAuthToken.getAuthorizationHeader();
        }

        return config;
      },
      responseError: function (rejection) {
        // Catch `invalid_request` and `invalid_grant` errors and ensure that the `token` is removed.
        var Notification = $injector.get('Notification');
        if (400 === rejection.status && rejection.data &&
          ('invalid_request' === rejection.data.error || 'invalid_grant' === rejection.data.error)
        ) {
          OAuthToken.removeToken();

          $rootScope.$emit('oauth:error', rejection);
        }

        if (400 === rejection.status && rejection.data && rejection.data.fieldErrors) {
          /*console.log("+++++++++++++++++")
          console.log(rejection.data.fieldErrors)*/
          $rootScope.$broadcast("validateError", rejection.data.fieldErrors);
        }


        // Catch `invalid_token` and `unauthorized` errors.
        // The token isn't removed here so it can be refreshed when the `invalid_token` error occurs.
        if (401 === rejection.status) {

          if ((rejection.data && 'invalid_token' === rejection.data.error) ||
            (rejection.headers('www-authenticate') && 0 === rejection.headers('www-authenticate').indexOf('Bearer'))) {
            $rootScope.$emit('oauth:error', rejection);
          } else {
            $rootScope.$emit('http.response.error.401', rejection);
          }

        }

        if (500 === rejection.status) {
          $translate("common.httperror.500").then(function (translatedValue) {
            Notification.error(translatedValue);
          });
          $rootScope.$emit('http.response.error.500', rejection);
        }

        //除401和400以外的错误
        if (401 != rejection.status && 400 != rejection.status && 500 != rejection.status) {
          $translate("common.httperror.network").then(function (translatedValue) {
            Notification.error(translatedValue);
          });
        }

        return $q.reject(rejection);
      }
    };
  }]);

})();
