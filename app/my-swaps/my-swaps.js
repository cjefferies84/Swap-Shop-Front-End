'use strict';

angular.module('myApp.mySwaps', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/my-swaps/:swapId', {
    templateUrl: 'my-swaps/my-swaps.html',
    controller: 'MySwapsCtrl'
  });
}])
    
.controller('MySwapsCtrl', ['$scope', 'Restangular', '$routeParams', '$location', function($scope, Restangular, $routeParams, $location) {

    $scope.swapId = $routeParams.swapId;

    Restangular.one('my-swaps', $scope.swapId).customGET().then(function(data){
        $scope.swap = data;
    });

        $scope.deleteItem = function() {
        var confirmation = confirm('Are you sure you want to delete this swap? This cannot be undone');

        if (confirmation) {
            Restangular.one('swaps', $scope.swapId).customDELETE().then(function() {
                alert('Your swap was successfully deleted!');
                $location.path('/swaps');
            },
            function() {
                alert('There was a problem deleting your swap')
            })
        }
    }
}]);