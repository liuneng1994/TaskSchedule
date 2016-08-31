(function() {
	'use strict';

	angular.module('core').service('commonService', ['$q', '$http', 'configParam','httpApiService', function($q, $http, configParam,httpApiService) {

    this.findLookupValues = function (params,lookupTypeCode) {
      var deferred = $q.defer();
			// console.log(params);
      httpApiService.get("lookupValue/findByLookupType", angular.merge({code:lookupTypeCode}, params)).then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }


	}]);

})();
