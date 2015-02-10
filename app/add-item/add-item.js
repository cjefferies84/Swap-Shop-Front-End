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
        $scope.item = {  user: 1, status: "Available"};

        // Save fields to the item object
        $scope.addItem = function() {

            var fd = new FormData();
            fd.append("picture", $scope.item.picture);
            fd.append("name", $scope.item.name);
            fd.append("description", $scope.item.description);
            fd.append("condition", $scope.item.condition);
            fd.append("status", $scope.item.status);
            fd.append("user", $scope.item.user);


           //Restangular.all('items/').customPOST(fd).then(function () {
           //         alert("Your swap item was successfully created");
           //         $location.path('/home');
           //     },
           //     function () {
           //         alert("There was a problem creating your swap item. Please try again.")
           //     })

            $http.post('http://localhost:8001/items/', fd, {
//            $http.post('http://vast-journey-8108.herokuapp.com/location', fd, {
//                withCredentials: true,
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity
            }).success(function (response) {
                    $window.location = 'index.html#/home';
                }).error(function (response) {
                    console.log('Response: ' + response);
                });
        };



        $scope.uploadFile = function (files) {
            $scope.item.picture = files[0];
            console.log($scope.item.picture);
        };


    }]);