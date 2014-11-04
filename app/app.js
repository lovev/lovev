'use strict';

// Declare app level module which depends on views, and components
angular
    .module('lovevApp', [
        'ngRoute',
        'lovevApp.user',
        'myApp.view1',
        'myApp.view2',
        'myApp.version'
    ])
    //config app constants
    .constant("constant", {
        "GET_TOKEN_URL": "/wapAccess_Account.msp",
        "GET_USER_INFO": "/h5/getUserInfo.jsp",
        "LOGIN_BY_PASSWORD_URL": "/login_Account.msp",
        "LOGIN_BY_TOKEN_URL": "/wapLogin_Account.msp",
        "LOGOUT_URL": "/logout_Account.msp"
    })
    //config route
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view1'});
    }])
    //config http ajax for debug
    .config(["$httpProvider", function ($httpProvider) {
        $httpProvider.interceptors.push(function () {
            return {
                request: function (config) {
                    console.info(config);
                    return config;
                },
                response: function (response) {
                    console.info(response);
                    return response;
                }
            };
        })
    }])
    //app initial
    .run(["$rootScope", "userService", function ($rootScope, userService) {
        userService.loginByAccessCode();
        $rootScope.logout = userService.logout;
        $rootScope.loginByPassword = function (data) {
            userService.loginByPassword(angular.extend(data, {veriCode: $rootScope.veriCode}));
        };
        $rootScope.loginByAccessCode = userService.loginByAccessCode;
    }]);

