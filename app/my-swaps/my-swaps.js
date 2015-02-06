'use strict';

angular.module('myApp.mySwaps', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mySwaps', {
    templateUrl: 'mySwaps/mySwaps.html',
    controller: 'mySwapsCtrl'
  });
}])

.controller('mySwapsCtrl', [function() {

}])

