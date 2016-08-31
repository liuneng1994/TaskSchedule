/*eslint angular/no-private-call: [2,{"allow":["$$phase"]}]*/
/*eslint angular/no-services: [2,{"directive":["$http","$q"],"controller":["$resource"]}]*/
(function () {
  'use strict';

  angular.module('theme')
    .controller('CurrentUserCtrl', [
      '$window',
      '$translate',
      'sessionService',
      CurrentUserCtrl]);

  /** @ngInject */
  function CurrentUserCtrl($window,$translate,sessionService) {
    var vm = this;
    this.currentUser = {
      username:"",
      email:"",
      lang:""
    }

    this.getCurrentUser = function () {
      sessionService.loadCurrentUser().then(function (currentUser) {
        vm.currentUser.username = currentUser.name;
        vm.currentUser.email = currentUser.emailAddress;
        vm.currentUser.lang = vm.setLanguage(currentUser.language.langCode);
      }, function(error) {
        if(error === 'error') {
          //vm.logout();
        }
      });
    }

    this.logout = function(){
      sessionService.logout();
    }

    this.setLanguage = function (lang) {
      if (lang !== null && angular.isDefined(lang)) {
        $translate.use(lang);
      }
      return lang;
    }

    vm.getCurrentUser();
    return this;
  }

})();
