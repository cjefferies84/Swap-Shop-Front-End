'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/my-swaps.html',
    controller: 'HomeCtrl'

  });
}])

.controller('homeCtrl', [function() {

}]);



