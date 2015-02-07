'use strict';

angular.module('myApp.mySwaps', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mySwaps', {
    templateUrl: 'my-swaps/my-swaps.html',
    controller: 'mySwapsCtrl'
  });
}])

.controller('mySwapsCtrl', [function() {

}])

