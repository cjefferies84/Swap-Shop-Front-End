'use strict';

angular.module('myApp.itemDetail', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/items/:itemId', {
            templateUrl: 'item-detail/item-detail.html',
            controller: 'ItemDetailCtrl'
        });
    }])

    .controller('ItemDetailCtrl', ['$scope', 'Restangular', '$routeParams', '$location', function ($scope, Restangular, $routeParams, $location) {
        $scope.itemId = $routeParams.itemId;

        Restangular.one('items', $scope.itemId).customGET().then(function (data) {
            $scope.item = data;
        });

        Restangular.all('items/').getList().then(function (data) {
            $scope.userItems = data;
        });

        $scope.deleteItem = function () {
            var confirmation = confirm('Are you sure you want to delete this item? This cannot be undone');

            if (confirmation) {
                Restangular.one('items', $scope.itemId).customDELETE().then(function () {
                        alert('Your item was successfully deleted!');
                        $location.path('/items');
                    },
                    function () {
                        alert('There was a problem deleting your item')
                    })
            }
        };

        $scope.swap = function() {
            if ($scope.showItems == true) {
                $scope.showItems = false;
                $scope.swapButtonText = "Show My Items";
            } else {
                $scope.showItems = true;
                $scope.swapButtonText = "Hide My Items";
            }

        };

        $scope.createSwap = function() {
            var selectedItems = [];

            for (var itemIndex = 0; itemIndex < $scope.userItems.length; itemIndex++) {
                var item = $scope.userItems[itemIndex];
                if (item.selected) {
                    selectedItems.push(item.id);
                }
            }

            var swap = {
                name: "Generic swap name",
                initiator: 1,
                initiator_items: selectedItems,
                other_party: 1,
                other_party_items: [$scope.item.id]
            };

            Restangular.one('swaps/').customPOST(swap).then(function() {
                console.log(swap);
            })
        };

        $scope.selectItem = function(item) {
            item.selected = item.hasOwnProperty('selected') ? !item.selected : true;
        }
    }]);