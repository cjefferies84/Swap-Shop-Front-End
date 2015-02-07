'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngCookies',
    'restangular',
    'myApp.home',
    'myApp.mySwaps',
    'myApp.swapGallery',
    'myApp.itemDetail',
    'myApp.version',
    'myApp.login'
]).
    config(['$routeProvider', "RestangularProvider", function ($routeProvider, RestangularProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});

        RestangularProvider.setBaseUrl('http://localhost:8001');

    }])

    .run(function ($cookieStore, $rootScope, $http, $location) {
        if ($cookieStore.get('djangotoken')) {
            $http.defaults.headers.common['Authorization'] = 'Token ' + $cookieStore.get('djangotoken');
            //document.getElementById("main").style.display = "block";
            //$location.path('/login')
        } else {
            $location.path('/login')
        }
    });
