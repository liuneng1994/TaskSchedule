(function () {
  'use strict';
  angular
    .module('core')
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      routerConfig
    ]);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/loading');

    $stateProvider.state('loading', {
      url: '/loading',
      views: {
        "layout": {
          controller: 'LoadingCtrl',
          controllerAs: 'vm',
          templateUrl: 'app/theme/controllers/loading/loading.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load(
            {
              serie: true,
              files: [
                'app/theme/controllers/loading/loading.controller.js'
              ]
            });
        }]
      }
    });

    $stateProvider.state('app', {
      abstract: true,
      url: '/app',
      ncyBreadcrumb: {
        label: 'app'
      },
      views: {
        'layout': {
          templateUrl: 'app/theme/controllers/layout/layout.html'
        },
        'sidebar@app': {
          templateUrl: 'app/core/controllers/menu/menu.side.html'
        },
        'main@app': {
          templateUrl: 'app/theme/controllers/layout/partials/main.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load(
            {
              serie: true,
              files: [
                'app/theme/controllers/layout/layout.js',
                'app/core/controllers/menu/menu.controller.js'
              ]
            });
        }]
      }
    });

    $stateProvider.state('login', {
      url: '/login',
      ncyBreadcrumb: {
        label: 'Login'
      },
      views: {
        "layout": {
          controller: 'LoginCtrl',
          controllerAs: 'vm',
          templateUrl: 'app/core/controllers/login/login.html'
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', 'sessionService', '$log', function ($ocLazyLoad, sessionService, $log) {
          $log.debug("enter login");
          sessionService.cleanUserData();
          return $ocLazyLoad.load(
            {
              serie: true,
              files: [
                'app/core/controllers/login/login.controller.js',
                'app/core/controllers/login/login.service.js'
              ]
            });
        }]
      }
    });

    $stateProvider.state('app.index', {
      url: '/index',
      ncyBreadcrumb: {
        label: 'common.index'
      },
      views: {
        'content@app': {
          templateUrl: 'app/core/controllers/index/index.html'
        }
      },
      resolve: {}
    });

    $stateProvider.state('app.deny', {
      url: '/deny',
      ncyBreadcrumb: {
        label: 'common.deny'
      },
      views: {
        'content@app': {
          templateUrl: 'app/theme/controllers/deny/deny.html'
        }
      },
      resolve: {}
    });

    // user
    $stateProvider.state('app.user', {
      url: '/user',
      ncyBreadcrumb: {
        label: 'core.user'
      },
      views: {
        'content@app': {
          templateUrl: 'app/core/controllers/user/user.index.html',
          controller: 'UserIndexCtrl',
          controllerAs: 'vm'
        }
      },
      resolve: {
        deps: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load(
              {
                serie: true,
                files: [
                  'app/core/controllers/user/user.controller.js',
                  'app/core/controllers/user/user.service.js',
                  'lib/xeditable.js'
                ]
              });
          }]
      }
    });
    $stateProvider.state('app.user.add', {
      url: '/add',
      ncyBreadcrumb: {
        label: 'core.user.add'
      },
      views: {
        'content@app': {
          templateUrl: 'app/core/controllers/user/user.add.html',
          controller: 'UserAddCtrl',
          controllerAs: 'vm'
        }
      }
    });
    $stateProvider.state('app.user.edit', {
      url: '/edit/:id',
      ncyBreadcrumb: {
        label: 'core.user.edit'
      },
      views: {
        'content@app': {
          templateUrl: 'app/core/controllers/user/user.edit.html',
          controller: 'UserEditCtrl',
          controllerAs: 'vm'
        }
      }
    });

    // lookupType
    $stateProvider.state('app.lookupType', {
      url: '/lookupType',
      ncyBreadcrumb: {
        label: 'core.lookupType'
      },
      views: {
        'content@app': {
          templateUrl: 'app/core/controllers/lookupType/lookupType.index.html',
          controller: 'LookupTypeIndexCtrl',
          controllerAs: 'vm'
        }
      },
      resolve: {
        deps: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load([]).then(
              function () {
                return $ocLazyLoad.load(
                  {
                    serie: true,
                    files: [
                      'app/core/controllers/lookupType/lookupType.controller.js',
                      'app/core/controllers/lookupType/lookupType.service.js',
                      'lib/xeditable.js',
                      'lib/xeditable.css'
                    ]
                  });
              }
            );
          }]
      }
    });
    $stateProvider.state('app.lookupType.add', {
      url: '/add',
      ncyBreadcrumb: {
        label: 'core.lookupType.add'
      },
      views: {
        'content@app': {
          templateUrl: 'app/core/controllers/lookupType/lookupType.add.html',
          controller: 'LookupTypeAddCtrl',
          controllerAs: 'vm'
        }
      }
    });
    $stateProvider.state('app.lookupType.edit', {
      url: '/edit/:id',
      ncyBreadcrumb: {
        label: 'core.lookupType.edit'
      },
      views: {
        'content@app': {
          templateUrl: 'app/core/controllers/lookupType/lookupType.edit.html',
          controller: 'LookupTypeEditCtrl',
          controllerAs: 'vm'
        }
      }
    });
    $stateProvider.state('app.lookupType.show', {
      url: '/show/:code',
      ncyBreadcrumb: {
        label: 'core.lookupType.show'
      },
      views: {
        'content@app': {
          templateUrl: 'app/core/controllers/lookupType/lookupType.show.html',
          controller: 'LookupTypeShowCtrl',
          controllerAs: 'vm'
        }
      }
    });

    // lookupValue
    $stateProvider.state('app.lookupValue', {
      url: '/lookupValue/add/:code',
      ncyBreadcrumb: {
        label: '添加快速编码'
      },
      views: {
        'content@app': {
          templateUrl: 'app/core/controllers/lookupValue/lookupValue.add.html',
          controller: 'LookupValueAddCtrl',
          controllerAs: 'vm'
        }
      },
      resolve: {
        deps: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load([]).then(
              function () {
                return $ocLazyLoad.load(
                  {
                    serie: true,
                    files: [
                      'app/core/controllers/lookupValue/lookupValue.controller.js',
                      'app/core/controllers/lookupValue/lookupValue.service.js'
                    ]
                  });
              }
            );
          }]
      }
    });
    // role
    $stateProvider.state('app.role', {
      url: '/role',
      ncyBreadcrumb: {
        label: 'core.role'
      },
      views: {
        'content@app': {
          templateUrl: 'app/core/controllers/role/role.index.html',
          controller: 'RoleIndexCtrl',
          controllerAs: 'vm'
        }
      },
      resolve: {
        deps: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load(['treeControl']).then(
              function () {
                return $ocLazyLoad.load(
                  {
                    serie: true,
                    files: [
                      'app/core/controllers/role/role.controller.js',
                      'app/core/controllers/role/role.service.js'
                    ]
                  });
              }
            );
          }]
      }
    });
    $stateProvider.state('app.role.add', {
      url: '/add',
      ncyBreadcrumb: {
        label: 'core.role.add'
      },
      views: {
        'content@app': {
          templateUrl: 'app/core/controllers/role/role.add.html',
          controller: 'RoleAddCtrl',
          controllerAs: 'vm'
        }
      }
    });
    $stateProvider.state('app.role.edit', {
      url: '/edit/:id',
      ncyBreadcrumb: {
        label: 'core.role.edit'
      },
      views: {
        'content@app': {
          templateUrl: 'app/core/controllers/role/role.edit.html',
          controller: 'RoleEditCtrl',
          controllerAs: 'vm'
        }
      }
    });

    // menu
    $stateProvider.state('app.menu', {
      url: '/menu',
      ncyBreadcrumb: {
        label: 'core.menu'
      },
      views: {
        'content@app': {
          templateUrl: 'app/core/controllers/menu/menu.index.html',
          controller: 'MenuIndexCtrl',
          controllerAs: 'vm'
        }
      },
      resolve: {
        deps: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load(['treeControl']).then(
              function () {
                return $ocLazyLoad.load(
                  {
                    serie: true,
                    files: [
                      'app/core/controllers/menu/menu.controller.js',
                      'app/core/controllers/menu/menu.service.js'
                    ]
                  });
              }
            );
          }]
      }
    });

    // oauthClientDetail
    $stateProvider.state('app.oauthClientDetail', {
      url: '/oauthClientDetail',
      ncyBreadcrumb: {
        label: 'core.oauthClientDetail'
      },
      views: {
        'content@app': {
          templateUrl: 'app/core/controllers/oauthClientDetail/oauthClientDetail.index.html',
          controller: 'OauthClientDetailIndexCtrl',
          controllerAs: 'vm'
        }
      },
      resolve: {
        deps: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load(
              {
                serie: true,
                files: [
                  'app/core/controllers/oauthClientDetail/oauthClientDetail.controller.js',
                  'app/core/controllers/oauthClientDetail/oauthClientDetail.service.js',
                  'lib/xeditable.js',
                  'lib/xeditable.css',
                  'lib/select.js',
                  'lib/select.css'
                ]
              });
          }]
      }
    });

    $stateProvider.state('app.oauthClientDetail.add', {
      url: '/add',
      ncyBreadcrumb: {
        label: 'core.oauthClientDetail.add'
      },
      views: {
        'content@app': {
          templateUrl: 'app/core/controllers/oauthClientDetail/oauthClientDetail.add.html',
          controller: 'OauthClientDetailAddCtrl',
          controllerAs: 'vm'
        }
      }
    });

    $stateProvider.state('app.oauthClientDetail.edit', {
      url: '/edit:id',
      ncyBreadcrumb: {
        label: 'core.oauthClientDetail.edit'
      },
      views: {
        'content@app': {
          templateUrl: 'app/core/controllers/oauthClientDetail/oauthClientDetail.edit.html',
          controller: 'OauthClientDetailEditCtrl',
          controllerAs: 'vm'
        }
      }
    });

    // organization
    $stateProvider.state('app.organization', {
      url: '/organization',
      ncyBreadcrumb: {
        label: 'core.organization'
      },
      views: {
        'content@app': {
          templateUrl: 'app/core/controllers/organization/organization.index.html',
          controller: 'OrganizationIndexCtrl',
          controllerAs: 'vm'
        }
      },
      resolve: {
        deps: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load([]).then(
              function () {
                return $ocLazyLoad.load(
                  {
                    serie: true,
                    files: [
                      'app/core/controllers/organization/organization.controller.js',
                      'app/core/controllers/organization/organization.service.js'
                    ]
                  });
              }
            );
          }]
      }
    });
    $stateProvider.state('app.organization.edit', {
      url: '/edit/:id',
      ncyBreadcrumb: {
        label: 'core.organization.edit'
      },
      views: {
        'content@app': {
          templateUrl: 'app/core/controllers/organization/organization.edit.html',
          controller: 'OrganizationEditCtrl',
          controllerAs: 'vm'
        }
      }
    });

    // passwordModify
    $stateProvider.state('app.passwordModify', {
      url: '/passwordModify',
      ncyBreadcrumb: {
        label: 'core.userInfo.passwordModify'
      },
      views: {
        'content@app': {
          templateUrl: 'app/core/controllers/userInfo/passwordModify.html',
          controller: 'PasswordModifyCtrl',
          controllerAs: 'vm'
        }
      },
      resolve: {
        deps: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load(
              {
                serie: true,
                files: [
                  'app/core/controllers/userInfo/passwordModify.controller.js',
                  'app/core/controllers/userInfo/passwordModify.service.js'
                ]
              });
          }
        ]
      }
    });

    // instance
    $stateProvider.state('app.instance', {
      url: '/instance',
      ncyBreadcrumb: {
        label: 'core.instance'
      },
      views: {
        'content@app': {
          templateUrl: 'app/core/controllers/instance/instance.index.html',
          controller: 'InstanceIndexCtrl',
          controllerAs: 'vm'
        }
      },
      resolve: {
        deps: [
          '$ocLazyLoad',
          function ($ocLazyLoad) {
            return $ocLazyLoad.load(
              {
                serie: true,
                files: [
                  'app/core/controllers/instance/instance.controller.js',
                  'app/core/controllers/instance/instance.service.js'
                ]
              });
          }]
      }
    });
  }

})();
