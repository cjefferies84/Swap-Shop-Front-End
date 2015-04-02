'use strict';

angular.module('myApp.register', ['ngRoute', 'ngCookies'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'register/register.html',
            controller: 'RegisterCtrl'
        });
    }])

.controller('RegisterCtrl', ['$scope', '$window', 'Restangular', function($scope, $window, Restangular) {
        $scope.user = {};

        $scope.username = null;
        $scope.password = null;
        $scope.first_name = null;
        $scope.last_name = null;
        $scope.email = null;

        $scope.doRegister = function() {
            $scope.user = {
                'email': $scope.email,
                'password': $scope.password,
                'username': $scope.username,
                'date_joined': new Date(),
                'first_name': $scope.first_name,
                'last_name': $scope.last_name,
                'user_permissions' : [],
                'groups' : []
            };
            Restangular.all('users').customPOST($scope.user)
                .then(function(response) {
                    $window.location = '#/swap-gallery';
                    console.log('Register Success: ' + response);
                }, function(response) {
                    console.log('Register error: ' + response);
                    $scope.errorMessage = response;
                });
        };

        $scope.hasError = function (field, validation) {
            if (validation) {
                return $scope.registerForm[field].$dirty && $scope.registerForm[field].$error[validation];
            }
            return $scope.registerForm[field].$dirty && $scope.registerForm[field].$invalid;
        };
    }]);