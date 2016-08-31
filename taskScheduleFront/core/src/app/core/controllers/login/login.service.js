/*eslint angular/no-private-call: [2,{"allow":["$$phase"]}]*/
/*eslint angular/no-services: [2,{"directive":["$http","$q"],"controller":["$resource"]}]*/
(function () {
  'use strict';

  angular.module('core')
    .service('loginService', ['$q', 'httpApiService', LoginService]);

  /** @ngInject */
  function LoginService($q, httpApiService) {

    this.login = function () {
      var loginHistory = {};
      loginHistory.loginAt = new Date();
      loginHistory.operateSystem = navigator.platform;
      loginHistory.browser = getBrowser();
      loginHistory.userAgent = navigator.userAgent;
      loginHistory.statusCode = 200;

      var deferred = $q.defer();
      httpApiService.post("loginHistory", loginHistory).then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }

    function getBrowser() {
      if (navigator.userAgent.indexOf("MSIE") > 0) {
        return "MSIE";
      } else if (navigator.userAgent.indexOf("Firefox") > 0) {
        return"Firefox";
      } else if (navigator.userAgent.indexOf("Safari") > 0 && navigator.userAgent.indexOf("Chrome") < 0) {
        return "Safari";
      } else if (navigator.userAgent.indexOf("Chrome") > 0) {
        return "Chrome";
      } else {
        return "MSIE";
      }
    }

  return this;
}

})();
