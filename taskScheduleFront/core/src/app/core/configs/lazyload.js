(function() {
  'use strict';

  angular.module('core')
    .config([
      '$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
          debug: true,
          events: true,
          modules: [
              {
                  name: 'treeControl',
                  files: [
                      'lib/angular-tree-control.js',
                      'lib/tree-control.css'
                  ]
              }
          ]
        });
      }
    ]);

})();
