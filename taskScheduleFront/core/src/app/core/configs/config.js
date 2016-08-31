(function() {
  'use strict';

  var core = angular.module('core');

  core.config([
    '$controllerProvider',
    '$compileProvider',
    '$filterProvider',
    '$provide',
    config
    ]);

  /** @ngInject */
  function config($controllerProvider, $compileProvider, $filterProvider, $provide) {
    core.controller = $controllerProvider.register;
    core.directive = $compileProvider.directive;
    core.filter = $filterProvider.register;
    core.factory = $provide.factory;
    core.service = $provide.service;
    core.constant = $provide.constant;
    core.value = $provide.value;
  }

  core.config(function($breadcrumbProvider) {
      $breadcrumbProvider.setOptions({
        translations: true,
        template: '<ul class="breadcrumb"><li ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel | translate}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel | translate}}</span></li></ul>'
      });
  });


  core.config(['OAuthProvider','OAuthTokenProvider','configParam','sessionServiceProvider', function(OAuthProvider,OAuthTokenProvider,configParam,sessionServiceProvider) {
    OAuthProvider.configure({
      baseUrl: configParam.endPoint,
      clientId: configParam.oauth.ClientId,
      clientSecret: configParam.oauth.ClientSecret, // optional
      grantPath: 'oauth/token'
    });
    OAuthTokenProvider.configure({
      options: {
        secure: configParam.oauth.secure
      }
    });
    sessionServiceProvider.configure({});
  }]);

  core.config(['NotificationProvider', function(NotificationProvider) {
    NotificationProvider.setOptions({
            delay: 5000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'top'
    });
  }]);

  core.config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push('myOauthInterceptor');
  }]);

  core.config(['$translateProvider',
    function TranslateConf ($translateProvider) {
      $translateProvider.useStaticFilesLoader({
        prefix: 'i18n/',
        suffix: '.json'
      });

      $translateProvider.preferredLanguage('zh_CN');
    }
  ]);

})();
