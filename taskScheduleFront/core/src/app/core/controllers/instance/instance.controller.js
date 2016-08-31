(function () {
    'use strict';

    angular
        .module('core')
        .controller('InstanceIndexCtrl', ['$scope', '$filter', '$templateCache', 'kendoGridService', 'instanceService', InstanceIndexCtrl]);

    /** @ngInject */
    function InstanceIndexCtrl($scope, $filter, $templateCache, kendoGridService, instanceService) {
        var vm = this;

        vm.start = function (quartzId) {
            instanceService.start(quartzId).then(function (data) {
                $scope.grid.dataSource.read();
            })
        }
        vm.stop = function (quartzId) {
            instanceService.stop(quartzId).then(function (data) {
                $scope.grid.dataSource.read();
            })
        }

        vm.getMainGridOptions = function () {
            var mainGridOptions = kendoGridService.getMainGridOptions();
            mainGridOptions.dataSource.transport = vm.getTransport();
            mainGridOptions.dataSource.schema = vm.getSchema();
            mainGridOptions.columns = vm.getColumns();
            mainGridOptions.editable = false;
            return mainGridOptions;
        }

        vm.getTransport = function () {
            var transport = {};

            transport.read = function (options) {
                return instanceService.read(options).then(function (data) {
                    options.success(data);
                }, function (error) {
                    options.error(error);
                });
            };

            transport.parameterMap = function (options, operation) {
                if (operation !== "read" && options.models) {
                    return {
                        models: kendo.stringify(options.models)
                    };
                }
            };
            return transport;
        }

        vm.getSchema = function () {
            var schema = kendoGridService.getSchema();
            schema.parse = function (data) {
                $.each(data.list, function (index, elem) {
                    data.list[index].createdAt = new Date(elem.createdAt);
                });
                return data;
            };
            schema.model = {
                id: "id",
                fields: {
                    ip: {},
                    mac: {},
                    createdAt: {},
                    quartzRunning: {},
                    quartzId: {},
                    version: { default: 0 }
                }
            };
            return schema;
        }

        vm.getColumns = function () {
            var columns = [];
            columns = [
                {
                    field: "ip",
                    title: $filter('translate')('core.instance.ip'),
                    width: "15%"
                },
                {
                    field: "mac",
                    title: $filter('translate')('core.instance.mac'),
                    width: "15%"
                },
                {
                    field: "createdAt",
                    title: $filter('translate')('core.instance.createdAt'),
                    width: "15%",
                    format: "{0:yyyy-MM-dd HH:mm}"
                },
                {
                    field: "quartzId",
                    title: $filter('translate')('core.instance.quartzId'),
                    width: "15%"
                },
                {
                    field: "quartzRunning",
                    title: $filter('translate')('core.instance.quartzRunning'),
                    width: "15%"
                },
                {
                    title: $filter('translate')('common.options'),
                    command: [
                        { name: "change", template: '<a class="btn btn-info btn-xs k-button k-button-icontext" ng-click="vm.stop(dataItem.quartzId)" ng-if="dataItem.quartzRunning"><i class="fa fa-list" aria-hidden="true"></i><span translate="core.instance.stop"></span></a><a class="btn btn-info btn-xs k-button k-button-icontext" ng-click="vm.start(dataItem.quartzId)" ng-if="!dataItem.quartzRunning"><i class="fa fa-list" aria-hidden="true"></i><span translate="core.instance.start"></span></a>' }
                    ],
                    width: "100px"
                }
            ];
            return columns;
        }

        return vm;
    }
})();