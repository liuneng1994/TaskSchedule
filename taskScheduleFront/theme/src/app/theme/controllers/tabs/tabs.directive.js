(function() {
'use strict';

angular.module('theme')
  .directive('tabs', ['$rootScope', '$state', Tabs])
  .directive('openTab', ['$state', '$translate', OpenTab]);

  /** @ngInject */
  function Tabs($rootScope, $state) {
    return {
      restrict: 'E',
      scope: {
        tabs: '=data',
        type: '@',
        justified: '@',
        vertical: '@',
        class: '@'
      },
      link: function(scope) {

        var updateTabs = function() {
          scope.updateTabs();
        };

        var unbindStateChangeSuccess = $rootScope.$on('$stateChangeSuccess', updateTabs);
        var unbindStateChangeError = $rootScope.$on('$stateChangeError', updateTabs);
        var unbindStateChangeCancel = $rootScope.$on('$stateChangeCancel', updateTabs);
        var unbindStateNotFound = $rootScope.$on('$stateNotFound', updateTabs);

        scope.$on('$destroy', unbindStateChangeSuccess);
        scope.$on('$destroy', unbindStateChangeError);
        scope.$on('$destroy', unbindStateChangeCancel);
        scope.$on('$destroy', unbindStateNotFound);
      },
      controller: ['$scope', function($scope) {
        $scope.tabs = [
          {
            heading: '首页',
            route: 'app.index'
          }
        ];

        if (!$scope.tabs) {
          throw new Error('UI Router Tabs: \'data\' attribute not defined, please check documentation for how to use this directive.');
        }
        if (!angular.isArray($scope.tabs)) {
          throw new Error('UI Router Tabs: \'data\' attribute must be an array of tab data with at least one tab defined.');
        }

        var currentStateEqualTo = function(tab) {
          var isEqual = $state.is(tab.route, tab.params, tab.options);
          return isEqual;
        };

        $scope.go = function(tab) {
          if (!currentStateEqualTo(tab) && !tab.disable) {
            $state.go(tab.route, tab.params, tab.options);
          }
        };

        /* whether to highlight given route as part of the current state */
        $scope.isActive = function(tab) {
          var isAncestorOfCurrentRoute = $state.includes(tab.route, tab.params, tab.options);
          return isAncestorOfCurrentRoute;
        };

        $scope.updateTabs = function() {
          // sets which tab is active (used for highlighting)
          angular.forEach($scope.tabs, function(tab, index) {
            tab.params = tab.params || {};
            tab.options = tab.options || {};
            tab.class = tab.class || '';

            tab.active = $scope.isActive(tab);
            if (tab.active) {
              $scope.tabs.active = index;
            }
          });

          // console.log($scope.tabs);
        };

        $scope.removeTab = function (tab) {
          var index = getTab(tab);

          var length = $scope.tabs.length - 1;
          // console.log(length)
          $scope.tabs.splice(index, 1);
          length -= 1;
          if (index != 0 && index != length) {
            index -= 1;
          }
          $scope.tabs[index].active = true;
          $scope.tabs.active = index;
          // console.log($scope.tabs)
        }
        

        $scope.isIndex = function (tab) {
          if (tab.route === "app.index") {
            return true;
          } else {
            return false;
          }
        }

        $rootScope.$on('add a tab', function (event, tab) {
          if (isExistence(tab)) {
            $scope.go(tab);
          } else {
            $scope.tabs.push(tab);
            $scope.go(tab);
          }
        });

        function isExistence(tab) {
          var existence = false;
          for (var i = 0; i < $scope.tabs.length; i++) {
            if($scope.tabs[i].route === tab.route) {
              existence = true;
              break;
            }
          }
          return existence;
        }

        function getTab(tab) {
          var index = -1;
          if ($scope.tabs.length === 1) {
            return index;
          }
          for (var i = 0; i < $scope.tabs.length; i++) {
            if($scope.tabs[i].route === tab.route) {
              index = i;
              break;
            }
          }
          return index;
        }

        // $scope.updateTabs();
      }],
      templateUrl: function(element, attributes) {
        return attributes.templateUrl || 'ui-router-tabs-default-template.html';
      }
    };
  }

  function OpenTab($state, $translate) {
    function getHeading(sref) {
      return $state.get(sref).ncyBreadcrumb.label;
    }
    return {
      restrict: "A",
      link:function (scope, element, attr) {
        element.on('click', function() {
          var sref = attr.uiSerf;
          if (attr.openTab == "true") { 
            var tab = {};
            $translate(getHeading(sref)).then(function (heading) {
              tab.heading = heading;
            });
            tab.route = sref;
            scope.$emit("add a tab", tab);
          } else {
            $state.go(sref);
          }
        });
      }
    }
  }
})();