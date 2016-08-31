/*eslint angular/no-private-call: [2,{"allow":["$$phase"]}]*/
/*eslint angular/no-services: [2,{"directive":["$http","$q"],"controller":["$resource"]}]*/
(function() {
'use strict';

angular.module('core')
  .directive('pageSelect', [PageSelect])
  .directive('stRatio',[StRatio])
  .directive('stEdit', [StEdit]);

angular.module('smart-table')
    .directive('stDelete',[StDelete]);

  /** @ngInject */
  function PageSelect() {
    return {
        restrict: 'E',
        template: '<input type="text" class="select-page" ng-model="inputPage" ng-change="selectPage(inputPage)">',
        link: function(scope, element, attrs) {
          scope.$watch('currentPage', function(c) {
          scope.inputPage = c;
        });
      }
    }
  }

  function StRatio(){
      return {
        link:function(scope, element, attr){
          var ratio=+(attr.stRatio);
          element.css('width',ratio+'%');
        }
      };
  }

  function StEdit() {
    return {
      restrict: 'E',
      template: '<span e-form="rowform" ng-show="!rowform.$visible" ng-transclude></span>',
      replace: true,
      transclude: true
    };
  }

  function StDelete() {
    return {
      require: '^stTable',
      link: function (scope, element, attrs, ctrl) {
         element.on('click', function() {
           scope.$on("delete a row",function(event, msg) {
             if (msg === "ok") {
              var tableState = ctrl.tableState();
              tableState.pagination.totalItemCount -= 1;
              ctrl.pipe(tableState, ctrl);
             }
          });
        });
      }
    };
  }

})();