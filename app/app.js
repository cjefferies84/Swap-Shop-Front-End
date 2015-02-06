'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.mySwaps',
  'myApp.swapGallery',
  'myApp.version',
  'restangular'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});

  RestangularProvider.setBaseUrl('http://localhost:8001');

}]);
