//Chat Toggle Link
angular.module('theme')
    .directive('skinChanger', ['$rootScope', '$filter','$state', '$stateParams', '$timeout', function ($rootScope, $filter, $state, $stateParams, $timeout) {
        return {
            restrict: 'AC',
            link: function (scope, el, attr) {
                el.on('click', function () {
                    $timeout(function () {
                        $rootScope.$apply(function () {
                            var skincolor = $filter('filter')(scope.skins, function (d) { return d.skin === el.attr('rel'); })[0];
                            $rootScope.settings.skin = skincolor.skin;
                            $rootScope.settings.color = skincolor.color;
                            $state.transitionTo($state.current, $stateParams, {
                                reload: true,
                                inherit: false,
                                notify: true
                            });
                        });
                    }, 100);
                });
                scope.skins = [
                    {
                        skin: 'app/theme/styles/skins/blue.css',
                        color: {
                            themeprimary: '#5db2ff',
                            themesecondary: '#ed4e2a',
                            themethirdcolor: '#ffce55',
                            themefourthcolor: '#a0d468',
                            themefifthcolor: '#e75b8d'
                        }
                    },
                    {
                        skin: 'app/theme/styles/skins/azure.css',
                        color: {
                            themeprimary: '#2dc3e8',
                            themesecondary: '#fb6e52',
                            themethirdcolor: '#ffce55',
                            themefourthcolor: '#a0d468',
                            themefifthcolor: '#e75b8d'
                        }
                    },
                    {
                        skin: 'app/theme/styles/skins/black.css',
                        color: {
                            themeprimary: '#474544',
                            themesecondary: '#d73d32',
                            themethirdcolor: '#ffce55',
                            themefourthcolor: '#a0d468',
                            themefifthcolor: '#e75b8d'
                        }
                    },
                    {
                        skin: 'app/theme/styles/skins/darkblue.css',
                        color: {
                            themeprimary: '#0072c6',
                            themesecondary: '#fb6e52',
                            themethirdcolor: '#ffce55',
                            themefourthcolor: '#a0d468',
                            themefifthcolor: '#e75b8d'
                        }
                    },
                    {
                        skin: 'app/theme/styles/skins/darkred.css',
                        color: {
                            themeprimary: '#ac193d',
                            themesecondary: '#7bd148',
                            themethirdcolor: '#5db2ff',
                            themefourthcolor: '#e75b8d',
                            themefifthcolor: '#ffce55'
                        }
                    },
                    {
                        skin: 'app/theme/styles/skins/deepblue.css',
                        color: {
                            themeprimary: '#001940',
                            themesecondary: '#d73d32',
                            themethirdcolor: '#ffce55',
                            themefourthcolor: '#a0d468',
                            themefifthcolor: '#e75b8d'
                        }
                    },
                    {
                        skin: 'app/theme/styles/skins/deepblue.css',
                        color: {
                            themeprimary: '#001940',
                            themesecondary: '#d73d32',
                            themethirdcolor: '#ffce55',
                            themefourthcolor: '#a0d468',
                            themefifthcolor: '#e75b8d'
                        }
                    },
                    {
                        skin: 'app/theme/styles/skins/gray.css',
                        color: {
                            themeprimary: '#585858',
                            themesecondary: '#fb6e52',
                            themethirdcolor: '#ffce55',
                            themefourthcolor: '#a0d468',
                            themefifthcolor: '#e75b8d'
                        }
                    },
                    {
                        skin: 'app/theme/styles/skins/green.css',
                        color: {
                            themeprimary: '#53a93f',
                            themesecondary: '#ed4e2a',
                            themethirdcolor: '#ffce55',
                            themefourthcolor: '#a0d468',
                            themefifthcolor: '#e75b8d'
                        }
                    },
                    {
                        skin: 'app/theme/styles/skins/orange.css',
                        color: {
                            themeprimary: '#ff8f32',
                            themesecondary: '#7bd148',
                            themethirdcolor: '#5db2ff',
                            themefourthcolor: '#a0d468',
                            themefifthcolor: '#e75b8d'
                        }
                    },
                    {
                        skin: 'app/theme/styles/skins/pink.css',
                        color: {
                            themeprimary: '#cc324b',
                            themesecondary: '#8cc474',
                            themethirdcolor: '#ffce55',
                            themefourthcolor: '#a0d468',
                            themefifthcolor: '#e75b8d'
                        }
                    },
                    {
                        skin: 'app/theme/styles/skins/purple.css',
                        color: {
                            themeprimary: '#8c0095',
                            themesecondary: '#ffce55',
                            themethirdcolor: '#e75b8d',
                            themefourthcolor: '#a0d468',
                            themefifthcolor: '#fb6e52'
                        }
                    },
                    {
                        skin: 'app/theme/styles/skins/teal.css',
                        color: {
                            themeprimary: '#03b3b2',
                            themesecondary: '#ed4e2a',
                            themethirdcolor: '#ffce55',
                            themefourthcolor: '#a0d468',
                            themefifthcolor: '#fb6e52'
                        }
                    }
                ];
                
            }
        };
    }]);