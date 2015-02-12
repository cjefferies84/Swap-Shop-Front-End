'use strict';

angular.module('myApp.mySwaps', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/my-swaps', {
            templateUrl: 'my-swaps/my-swaps.html',
            controller: 'MySwapsCtrl'
        });
    }])

    .controller('MySwapsCtrl', ['$scope', 'Restangular', function ($scope, Restangular) {

        Restangular.all('swaps-nested/').getList().then(function (data) {
            $scope.swaps = data;
        });


        $scope.deleteSwap = function () {
            var confirmation = confirm('Are you sure you want to delete this swap? This cannot be undone');

            if (confirmation) {
                Restangular.one('swaps', $scope.swapId).customDELETE().then(function () {
                        alert('Your swap was successfully deleted!');
                        $location.path('/swaps');
                    },
                    function () {
                        alert('There was a problem deleting your swap')
                    })
            }
        }
    }]);