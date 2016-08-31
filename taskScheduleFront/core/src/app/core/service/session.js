/*eslint angular/log: 0*/
(function() {
	'use strict';

	angular.module('core').provider('sessionService', [function() {
		// Provider标准结构
		// 默认配置信息
		var defaults = {
			key: 'App.Data',
			grant_type: 'password'
		};
		//必须的属性
		var requiredKeys = [
			'key', 'grant_type'
		];

		var config;
		//在module的config中配置
		this.configure = function(params) {
			// Can only be configured once.
			if (config) {
				throw new Error('Already configured.');
			}

			// Check if is an `object`.
			if (!(params instanceof Object)) {
				throw new TypeError('Invalid argument: `config` must be an `Object`.');
			}

			// Extend default configuration.
			config = angular.extend({}, defaults, params);

			// Check if all required keys are set.
			angular.forEach(requiredKeys, function(key) {
				if (!config[key]) {
					throw new Error("Missing parameter: " + key);
				}
			});

			return config;
		};

		this.$get = ['$state', 'configParam', '$q', '$rootScope', '$log', 'OAuth', 'OAuthToken', 'httpApiService', 'sessionDataService','$window', function($state, configParam, $q, $rootScope, $log, OAuth, OAuthToken, httpApiService, sessionDataService,$window) {

			var sessionService = {}


			sessionService.login = function(user) {
				if (configParam.loginType == "session") {
					console.log("session login");
					return sessionService._loginSession(user);
				} else if (configParam.loginType == "oauth") {
					return sessionService._loginOauth(user);
				}
			}
			sessionService._loginOauth = function(user) {
				var deferred = $q.defer();
				var loginParams = angular.extend({}, user, {
					grant_type: config.grant_type
				});
				OAuth.getAccessToken(loginParams).then(function(response) {
					httpApiService.get('menu/mine', {}).then(function(data) {
						var menus = {};
						angular.forEach(data, function(menu) {
							if (menu.parentId) {
								menus[menu.parentId] = menus[menu.parentId] || [];
								menus[menu.parentId].push(menu);
							} else {
								menus["top"] = menus["top"] || [];
								menus["top"].push(menu);
							}
						})
						sessionDataService.setData("myMenu", menus);
						$log.debug(sessionDataService.getData("myMenu"));
						deferred.resolve(response);
					});
				}, function(error) {
					deferred.reject(error);
				});
				return deferred.promise;
			}

			sessionService._loginSession = function(user) {
				var deferred = $q.defer();
				var loginParams = angular.extend({}, user);
				httpApiService.postFormData('login', loginParams).then(function(response) {
					httpApiService.get('menu/mine', {}).then(function(data) {
						var menus = {};
						angular.forEach(data, function(menu) {
							if (menu.parentId) {
								menus[menu.parentId] = menus[menu.parentId] || [];
								menus[menu.parentId].push(menu);
							} else {
								menus["top"] = menus["top"] || [];
								menus["top"].push(menu);
							}
						})
						sessionDataService.setData("myMenu", menus);
						$log.debug(sessionDataService.getData("myMenu"));
						deferred.resolve(response);
					});
				}, function(error) {
					console.log(error);
					console.log("-------------------------------------error");
					deferred.reject(error);
				});
				return deferred.promise;
			}

			sessionService._loginSSO = function(user) {

			}

			sessionService.redirectLogin = function(){
				if (configParam.loginType == "session") {
					return sessionService._redirectLoginSession();
				}else if (configParam.loginType == "sso") {
					return sessionService._redirectLoginSSO();
				}else {
					return sessionService._redirectLoginOauth();
				}
			}

			sessionService._redirectLoginOauth = function() {
				$state.go(configParam.loginState);
			}

			sessionService._redirectLoginSession = function() {
				$state.go(configParam.loginState);
			}

			sessionService._redirectLoginSSO = function() {
				$window.location.href = configParam.apiEndPoint+"defaultCasTarget"
			}

			sessionService.logout = function() {
				sessionService.cleanUserData();
				if (configParam.loginType == "session") {
					return sessionService._logoutSession();
				}else if (configParam.loginType == "sso") {
					return sessionService._logoutSso();
				}else {
					return sessionService._logoutOauth();
				}
			}


			sessionService._logoutOauth = function() {
				httpApiService.delete("logout").then(function(response) {
					$state.go(configParam.loginState);
				});
			}

			sessionService._logoutSession = function() {
				httpApiService.get("session/logout").then(function(response) {
					$state.go(configParam.loginState);
				});
			}

			sessionService._logoutSso = function() {
				$window.location.href  = configParam.apiEndPoint+"logout/cas"
			}

			sessionService.loadPublicPermission = function() {
				var deferred = $q.defer();
				if (sessionDataService.getData("publicPermission") && sessionDataService.getData("publicPermission").length > 0) {
					deferred.resolve(sessionDataService.getData("publicPermission").concat(configParam.defaultPublicPermission));
				} else {
					httpApiService.get('public/permission/findPublic', {}).then(function(response) {
						var publicPermission = [];
						angular.forEach(response, function(permission) {
							publicPermission.push(permission.permission);
						});
						sessionDataService.setData("publicPermission", publicPermission);
						deferred.resolve(publicPermission.concat([configParam.loginState]));
					}, function(error) {
						deferred.resolve([]);
					});
				}
				return deferred.promise;
			}

			sessionService.loadMyPermission = function() {
				if (configParam.loginType == "session") {
					return sessionService._loadMyPermissionSession();
				} else if (configParam.loginType == "oauth") {
					return sessionService._loadMyPermissionOauth();
				} else if (configParam.loginType == "sso") {
					return sessionService._loadMyPermissionSSO();
				}
			}

			sessionService._loadMyPermissionSSO = function(){
				var deferred = $q.defer();

				if (sessionDataService.getData("myPermission") && Object.keys(sessionDataService.getData("myPermission")).length > 0) {
					deferred.resolve(sessionDataService.getData("myPermission"));
				} else {
					httpApiService.get('permission/mine', {}).then(function (response) {
						var myPermission = [];
						angular.forEach(response, function (permission) {
							myPermission.push(permission.permission);
						});
						sessionDataService.setData("myPermission", myPermission);
						deferred.resolve(myPermission.concat([configParam.denyState, configParam.indexState]));
					}, function (error) {
						deferred.reject(error);
					});
				}
				
				return deferred.promise;
			}
				
			sessionService._loadMyPermissionOauth = function(){
				var deferred = $q.defer();

				if (OAuth.isAuthenticated()) {
					if (sessionDataService.getData("myPermission") && Object.keys(sessionDataService.getData("myPermission")).length > 0) {
						deferred.resolve(sessionDataService.getData("myPermission"));
					} else {
						httpApiService.get('permission/mine', {}).then(function(response) {
							var myPermission = [];
							angular.forEach(response, function(permission) {
								myPermission.push(permission.permission);
							});
							sessionDataService.setData("myPermission", myPermission);
							deferred.resolve(myPermission.concat([configParam.denyState,configParam.indexState]));
						}, function(error) {
							deferred.reject(error);
						});
					}
				} else {
					deferred.resolve([]);
				}
				return deferred.promise;
			}

			sessionService.cleanUserData = function() {
				OAuthToken.removeToken();
				sessionDataService.setData("myPermission", undefined);
				sessionDataService.setData("publicPermission", undefined);
				sessionDataService.setData("currentUser", undefined);
				sessionDataService.setData("myMenu", undefined);
				sessionDataService.setData("currentMenuId", undefined);
			}
			sessionService.loadMyMenu = function() {
				var deferred = $q.defer();
				if (sessionDataService.getData("myMenu") && Object.keys(sessionDataService.getData("myMenu")).length > 0) {
					deferred.resolve(sessionDataService.getData("myMenu"));
				} else {
					httpApiService.get("menu/mine", {}).then(function(response) {
						var menus = {};
						angular.forEach(response, function(menu) {
							if (menu.parentId) {
								menus[menu.parentId] = menus[menu.parentId] || [];
								menus[menu.parentId].push(menu);
							} else {
								menus["top"] = menus["top"] || [];
								menus["top"].push(menu);
							}
						})
						sessionDataService.setData("myMenu",menus);
						deferred.resolve(menus);
					});
				}
				return deferred.promise;
			}

			sessionService.loadCurrentUser = function() {
				var deferred = $q.defer();
				if (sessionDataService.getData("currentUser") && Object.keys(sessionDataService.getData("currentUser")).length > 0) {
					deferred.resolve(sessionDataService.getData("currentUser"));
				} else {
					httpApiService.get("user/current", {}).then(function(currentUser) {
						sessionDataService.setData("currentUser", currentUser);
						deferred.resolve(currentUser);
					},function(error){
						deferred.reject(error);
					});
				}
				return deferred.promise;
			}

			sessionService.setCurrentMenuId = function(id) {
				sessionDataService.setData("currentMenuId", id);
			}

			sessionService.loadCurrentMenuId = function() {
				var deferred = $q.defer();
				var currentMenuId = sessionDataService.getData("currentMenuId");
				var myMenu = sessionDataService.getData("myMenu");
				var resourceValue = $state.current.name;
				angular.forEach(myMenu, function (menus, index) {
					angular.forEach(menus, function (menu, key) {
						if (angular.isDefined(menu.resource) && menu.resource != null) {
							if (angular.equals(menu.resource.resourceValue, resourceValue)) {
								if (menu.id != currentMenuId) {
									sessionService.setCurrentMenuId(menu.id);
									deferred.resolve(menu.id);
								} else {
									deferred.resolve(currentMenuId);
								}
								return;
							} else {
								return;
							}
						} else {
							return;
						}
					})
				})
				return deferred.promise;
			}
			return sessionService;
		}];
	}]).service('sessionDataService', ['$window', function($window) {
		var config = {
			key: "App.Data"
		};
		this.setData = function(key, value) {
			var mydata = $window.sessionStorage.getItem(config.key);
			if (mydata) {
				mydata = angular.fromJson(mydata);
			} else {
				mydata = {};
			}
			mydata[key] = value;
			$window.sessionStorage.setItem(config.key, angular.toJson(mydata));
		}

		this.getData = function(key) {
			var mydata = $window.sessionStorage.getItem(config.key);
			if (mydata) {
				mydata = angular.fromJson(mydata);
			}
			return (mydata || {})[key];
		}
	}]).service('httpApiService', ['$q', '$http', 'configParam', function($q, $http, configParam) {

		this.get = function(url, params) {
			var deferred = $q.defer();
			$http.get(configParam.apiEndPoint + url, {
				params: params
			}).success(function(response) {
				deferred.resolve(response);
			}).error(function(error, status) {
				deferred.reject(error);
			});
			return deferred.promise;
		}
		this.post = function(url, params) {
			var deferred = $q.defer();
			$http.post(configParam.apiEndPoint + url, params).success(function(response) {
				console.log("=======DataTypeService create");
				console.log(response);
				deferred.resolve(response);
			}).error(function(error, status) {
				deferred.reject(error);
			});
			return deferred.promise;
		}
		this.put = function(url, params) {
			var deferred = $q.defer();
			$http.put(configParam.apiEndPoint + url, params).success(function(response) {
				deferred.resolve(response);
			}).error(function(error, status) {
				deferred.reject(error);
			});
			return deferred.promise;
		}
		this.delete = function(url, params) {
			var deferred = $q.defer();
			$http.delete(configParam.apiEndPoint + url, {
				params: params
			}).success(function(response) {
				deferred.resolve(response)
			}).error(function(error, status) {
				deferred.reject(error);
			});
			return deferred.promise;
		}
		this.postFormData = function(url, parmas) {
			var deferred = $q.defer();
			$http({
				method: 'POST',
				url: configParam.apiEndPoint + url,
				data: $.param(parmas),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json'
				}
			}).success(function(response) {
				deferred.resolve(response)
			}).error(function(error, status) {
				deferred.reject(error);
			});
			return deferred.promise;
		}
	}]);

})();
