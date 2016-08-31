(function() {
  'use strict';

  var core = angular.module('core')

  core.constant("configParam",(function(){
    var configParam = {};
    configParam.loginType="oauth";
    configParam.oauth = {}
    configParam.oauth.ClientId = "client2";
    configParam.oauth.ClientSecret= "secret";
    configParam.oauth.secure = false;
    configParam.schema = "http://";
    configParam.host = "hapr1.saas.hand-china.com";
    configParam.port = "";
    configParam.baseUri = "backend/";
    configParam.endPoint = "/"+configParam.baseUri;
    configParam.apiUri = "api/";
    configParam.apiEndPoint = configParam.endPoint+configParam.apiUri;
    configParam.indexState = "app.index";
    configParam.loginState = "login";
    configParam.logoutState = "logout";
    configParam.denyState = "app.deny";
    return configParam;
  })());

})();
