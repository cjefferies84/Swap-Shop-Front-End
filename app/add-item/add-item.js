'use strict';

angular.module('myApp.addItem', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-item', {
            templateUrl: 'add-item/add-item.html',
            controller: 'AddItemCtrl'
        });
    }])

    .controller('AddItemCtrl', ['$scope', 'Restangular', '$location', '$http', function ($scope, Restangular, $location, $http) {
        // Takes input from the form. Currently 'user' and 'status' are hard coded
        $scope.item = {user: 1, status: "Available"};

        // Save fields to the item object
        $scope.addItem = function () {

            var fd = new FormData();
            fd.append("picture", $scope.item.picture);
            fd.append("name", $scope.item.name);
            fd.append("description", $scope.item.description);
            fd.append("condition", $scope.item.condition);
            fd.append("status", $scope.item.status);
            fd.append("user", $scope.item.user);

            $http.post('http://localhost:8001/items/', fd, {
                headers: {'Content-Type': undefined}
            }).success(function (response) {
                $location.path('/swap-gallery');
            }).error(function (response) {
                console.log('Error response: ' + response);
            });
        };

        $scope.uploadFile = function (files) {
            $scope.item.picture = files[0];
        };

       $scope.conditions = ['Poor', 'Fair', 'Good', 'Excellent', 'Like New', 'New']

    }]);