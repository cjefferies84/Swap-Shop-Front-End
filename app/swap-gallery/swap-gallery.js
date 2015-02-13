'use strict';

angular.module('myApp.swapGallery', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/swap-gallery', {
    templateUrl: 'swap-gallery/swap-gallery.html',
    controller: 'SwapGalleryCtrl'
  });
}])

.controller('SwapGalleryCtrl', ['$scope', 'Restangular', function($scope, Restangular) {
    Restangular.all('items/').getList().then(function(data) {
        $scope.items = data;
    });

 // allows swap items to be deleted at items endpoint
  $scope.deleteItem = function(itemID) {
    Restangular.one('items', itemID).customDELETE().then(function(){
        $location.path('/items');
    })
  }


}]);