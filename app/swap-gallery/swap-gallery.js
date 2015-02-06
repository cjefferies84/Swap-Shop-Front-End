'use strict';

angular.module('myApp.swapGallery', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/swap-gallery', {
    templateUrl: 'swap-gallery/swap-gallery.html',
    controller: 'SwapGalleryCtrl'
  });
}])

.controller('SwapGalleryCtrl', ['$scope', 'Restangular', function($scope, Restangular) {
    Restangular.all('swaps').getList().then(function(data) {
        $scope.swapGallery = data;
    });

  $scope.deleteRecipe = function(recipeID) {
    Restangular.one('swap-gallery', recipeID).customDELETE().then(function(){
        $location.path('/swap-gallery');
    })
  }
}]);