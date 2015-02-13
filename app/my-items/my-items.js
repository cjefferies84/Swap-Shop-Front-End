'use strict';

angular.module('myApp.myItems', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/my-items', {
    templateUrl: 'my-items/my-items.html',
    controller: 'MyItemsCtrl'
  });
}])

.controller('MyItemsCtrl', ['$scope', 'Restangular', function($scope, Restangular) {
    Restangular.all('items/').getList().then(function(data) {
        $scope.items = data;
    });
    $scope.search = {}
    $scope.search.user = 1 // get user id from the cookiestore
 // allows swap items to be deleted at items endpoint
  $scope.deleteItem = function(itemID) {
    Restangular.one('items', itemID).customDELETE().then(function(){
        $location.path('/items');
    })
  }
}]);