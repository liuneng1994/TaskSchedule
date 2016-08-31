(function () {
  'use strict';

  angular.module('theme')
    .directive('gridWidgetButtons', ['$compile', GridWidgetButtons]);

  /** @ngInject */
  function GridWidgetButtons($compile) {
    function hasAttr(array, str) {
      
    }
    return {
        link:function(scope, element, attr){
        var gridWidgetButtons = attr.gridWidgetButtons;
        var template = "";
        if ( gridWidgetButtons.indexOf('new') > -1 ) {
          template += "<button class='btn btn-sm btn-primary' ng-click='grid.addRow();'><i class='fa fa-plus'></i><span translate='common.new'></span></button>";
        } 
        if (gridWidgetButtons.indexOf('save') > -1 ) {
          template += "<button class='btn btn-sm btn-primary' ng-click='grid.saveChanges();'><i class='fa fa-save'></i><span translate='common.save'></span></button>";
        }
        if (gridWidgetButtons.indexOf('cancel') > -1 ) {
          template += "<button class='btn btn-sm btn-danger' ng-click='grid.cancelChanges();'><i class='fa fa-rotate-left'></i><span translate='common.cancel'></span></button>";
        }
        element.append(template);
        $compile(element.contents())(scope);
      }
    }
  }
})();