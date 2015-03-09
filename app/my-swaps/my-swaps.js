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

        $scope.initiateSwap = function (id) {
            var confirmation = confirm('Are you sure you want to initiate this swap?');

            if (confirmation) {
                var whatIActuallyWant = null;
                for(var ugh = 0; ugh < $scope.swaps.length; ugh++) {
                    console.log("checking " + $scope.swaps[ugh].id);
                    if($scope.swaps[ugh].id == id) {
                        console.log("found it");
                        whatIActuallyWant = $scope.swaps[ugh];
                    }
                }
                console.log(whatIActuallyWant);
                Restangular.one('swaps', id).customPUT(whatIActuallyWant).then(function () {
                        alert('You have initiated a swap successfully!');
                        $location.path('/swaps');
                    },
                    function () {
                        alert('There was a problem initiating your item')
                    })
            }
        };

        $scope.declineSwap = function () {
            var confirmation = confirm('Are you sure you want to decline this swap?');

            if (confirmation) {
                Restangular.one('items', $scope.swapId).customPUT().then(function () {
                        alert('Your have declined swap successfully!');
                        $location.path('/items');
                    },
                    function () {
                        alert('There was a problem declining your swap')
                    })
            }
        };


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