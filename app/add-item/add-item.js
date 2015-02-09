'use strict';

angular.module('myApp.addItem', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-item', {
            templateUrl: 'add-item/add-item.html',
            controller: 'AddItemCtrl'
        });
    }])

    .controller('AddItemCtrl', ['$scope', 'Restangular', '$location', function ($scope, Restangular, $location) {
        // Takes input from the form. Currently 'user' and 'status' are hard coded
        $scope.item = {  user: 1, status: "Available"};

        // Save fields to the item object
        $scope.addItem = function() {

           Restangular.all('items/').customPOST($scope.item).then(function () {
                    alert("Your swap item was successfully created");
                    $location.path('/home');
                },
                function () {
                    alert("There was a problem creating your swap item. Please try again.")
                })
        };


    }]);