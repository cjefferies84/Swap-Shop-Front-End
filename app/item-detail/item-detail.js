'use strict';

angular.module('myApp.itemDetail', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/items/:itemId', {
    templateUrl: 'item-detail/item-detail.html',
    controller: 'ItemDetailCtrl'
  });
}])

.controller('ItemDetailCtrl', ['$scope', 'Restangular', '$routeParams', '$location', function($scope, Restangular, $routeParams, $location) {

    $scope.itemId = $routeParams.itemId;

    Restangular.one('items', $scope.itemId).customGET().then(function(data){
        $scope.item = data;
    });

        $scope.deleteItem = function() {
        var confirmation = confirm('Are you sure you want to delete this item? This cannot be undone');

        if (confirmation) {
            Restangular.one('items', $scope.itemId).customDELETE().then(function() {
                alert('Your item was successfully deleted!');
                $location.path('/items');
            },
            function() {
                alert('There was a problem deleting your item')
            })
        }
    }
}]);