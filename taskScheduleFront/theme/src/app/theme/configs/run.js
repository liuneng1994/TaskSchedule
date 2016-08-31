(function() {
	'use strict';

	angular.module('theme')
		.run(['$templateCache', template]);

	/** @ngInject */
	function template($templateCache) {
		var CUSTOM_UI_VIEW_TEMPLATE = '<div class="nav nav-tabs">' +
      '<tabset active="tabs.active" class="tab-container" type="{{type}}" vertical="{{vertical}}" justified="{{justified}}" class="{{class}}">' +
      '<tab class="tab {{tab.class}}" ng-repeat="tab in tabs" ' +
      'disable="tab.disable" ng-click="go(tab)">' +
      '<tab-heading>{{tab.heading}} <span class="glyphicon glyphicon-remove" style="font-size: 10px" ng-click="removeTab(tab);" ng-show="!isIndex(tab)"></span></tab-heading>' +
      '</tab>' +
      '</tabset>' +
      '</div>';

    var INLINE_TEMPLATE = '<div>' +
      '<tabset active="tabs.active" class="tab-container" type="{{type}}" vertical="{{vertical}}" justified="{{justified}}" class="{{class}}">' +
      '<tab class="tab {{tab.class}}" ng-repeat="tab in tabs" ' +
      'disable="tab.disable" ng-click="go(tab)">' +
      '<tab-heading ng-bind-html="tab.heading"></tab-heading>' +
      '</tab>' +
      '</tabset>' +
      '<ui-view></ui-view>' +
      '</div>';

    var KENDO_BUTTON_EDIT = "<a class='btn btn-success btn-xs k-button k-button-icontext k-grid-edit'><i class='fa fa-pencil' aria-hidden='true'></i><span translate='common.edit'></span></a>";
    var KENDO_BUTTON_DELETE = "<a class='btn btn-danger btn-xs k-button k-button-icontext k-grid-delete'><i class='fa fa-trash-o' aria-hidden='true'></i><span translate='common.delete'></span></a>";
    var KENDO_BUTTON_DETAILES = "<a class='btn btn-info btn-xs k-button k-button-icontext' ng-click='vm.gridShow(dataItem)'><i class='fa fa-list' aria-hidden='true'></i><span translate='common.details'></span></a>";

    $templateCache.put('ui-router-tabs-custom-ui-view-template.html', CUSTOM_UI_VIEW_TEMPLATE);
    $templateCache.put('ui-router-tabs-default-template.html', INLINE_TEMPLATE);
    $templateCache.put('kendo-grid-button-edit.html', KENDO_BUTTON_EDIT);
    $templateCache.put('kendo-grid-button-delete.html', KENDO_BUTTON_DELETE);
    $templateCache.put('kendo-grid-button-details.html', KENDO_BUTTON_DETAILES);
	}
})();
