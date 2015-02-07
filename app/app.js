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
])
    .config(['$routeProvider', "RestangularProvider", function ($routeProvider, RestangularProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});

        RestangularProvider.setBaseUrl('http://localhost:8001');
    }])

    .run(['$cookieStore', '$rootScope', '$http', '$location', 'Restangular', function ($cookieStore, $rootScope, $http, $location, Restangular) {
        if ($cookieStore.get('djangotoken')) {
            $http.defaults.headers.common['Authorization'] = 'Token ' + $cookieStore.get('djangotoken');
            //document.getElementById("main").style.display = "block";
            //$location.path('/login')
        } else {
            $location.path('/login')
        }

        // Add auth token to every Restangular request
        Restangular.setFullRequestInterceptor(function(element, operation, route, url, headers, params) {

            var token = $cookieStore.get('djangotoken');
            if (token) {
                headers['Authorization'] = 'Token ' + token;
            }

            return { element: element, params: params, headers: headers }
        });
    }]);
