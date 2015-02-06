'use strict';

angular.module('myApp.Home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/my-swaps.html',
    controller: 'HomeCtrl'

  });
}])

.controller('homeCtrl', [function() {

}]);



