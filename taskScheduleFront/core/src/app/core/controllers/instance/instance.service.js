(function () {
    'use strict';

    angular
        .module('core')
        .service('instanceService', ['$q', 'httpApiService', InstanceService]);

    /** @ngInject */
    function InstanceService($q, httpApiService) {
        this.read = function (params) {
            var deferred = $q.defer();
            httpApiService.get("instance/index", {
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

        this.start = function (params) {
            var deferred = $q.defer();
            httpApiService.post("instance/start/" + params).then(function (data) {
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }

        this.stop = function (params) {
            var deferred = $q.defer();
            httpApiService.delete("instance/stop/" + params).then(function (data) {
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    }
})();