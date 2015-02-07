'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.mySwaps',
  'myApp.swapGallery',
  'myApp.itemDetail',
  'myApp.version',
  'restangular'
]).
config(['$routeProvider', "RestangularProvider", function($routeProvider, RestangularProvider ) {
  $routeProvider.otherwise({redirectTo: '/home'});

  RestangularProvider.setBaseUrl('http://localhost:8001');

}]);
