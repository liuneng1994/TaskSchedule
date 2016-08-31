(function () {
  'use strict';

  angular.module('core')
    .directive('menu', [Menu])
    .directive('childMenu', ['$rootScope', '$compile', '$state', 'sessionService', ChildMenu]);


  /** @ngInject */
  function Menu() {
    return {
      restrict: "E",
      replace: true,
      scope: {
        menus: '='
      },
      template: "<ul><child-menu ng-repeat='children in menus' children='children'></child-menu><ul>"
    };
  }

  function ChildMenu($rootScope, $compile, $state, sessionService) {
    function getHref(sref) {
      return $state.href(sref);
    }
    return {
      restrict: "E",
      replace: true,
      scope: {
        children: '='
      },
      template: "<li ui-sref-active='active'></li>",
      link: function (scope, element, attrs) {
        scope.selectMenuId = function (id) {
          sessionService.setCurrentMenuId(id);
        }
        var children = scope.children;
        var tab = $rootScope.settings.tab;
        var sref = "";
        var href = "";
        var template = "";
        if (angular.isArray(children.children) && children.children.length >= 1) {
          if (angular.isUndefined(children.resource) || children.resource === null) {
            template += "<a href='#' class='menu-dropdown'>";
            template += "<i class='menu-icon " + children.icon + "'></i>";
            template += "<span class='menu-text'> " + children.name + " </span>";
            template += "<i class='menu-expand'></i></a>";

            element.append(template);
          } else {
            sref = children.resource.resourceValue;
            href = getHref(sref);

            template += "<a class='menu-dropdown' href='" + href + "' ui-sref='" + sref + "' open-tab='" + tab + "'>";
            template += "<i class='menu-icon " + children.icon + "'></i><span class='menu-text'> ";
            template += children.name;
            template += " </span><i class='menu-expand'></i></a>";

            element.append(template);
          }

          element.append("<menu menus='children.children' class='submenu'></menu>");
        } else {
          sref = children.resource.resourceValue;
          href = getHref(sref);

          template += "<a href='" + href + "' ui-serf='" + sref + "' open-tab='" + tab + "' ng-click='selectMenuId(" + children.id + ")'>";
          template += "<span class='menu-text'>" + children.name + " </span></a>";

          element.append(template);
        }

        $compile(element.contents())(scope);
      }
    };
  }

})();