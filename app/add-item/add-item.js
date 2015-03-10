'use strict';

angular.module('myApp.addItem', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-item', {
            templateUrl: 'add-item/add-item.html',
            controller: 'AddItemCtrl'
        });
    }])

    .controller('AddItemCtrl', ['$scope', 'Restangular', '$location', '$http', function ($scope, Restangular, $location, $http) {
        // Takes input from the form. Currently 'user' and 'status' are hard coded
        $scope.item = {user: 1, status: "Available"};

        // Save fields to the item object
        $scope.addItem = function () {

            var fd = new FormData();
            fd.append("picture", $scope.item.picture);
            fd.append("name", $scope.item.name);
            fd.append("description", $scope.item.description);
            fd.append("condition", $scope.item.condition);
            fd.append("status", $scope.item.status);
            fd.append("user", $scope.item.user);

            $http.post('http://localhost:8001/items/', fd, {
                headers: {'Content-Type': undefined}
            }).success(function (response) {
                $location.path('/my-items');
            }).error(function (response) {
                console.log('Error response: ' + response);
            });
        };

        $scope.uploadFile = function (files) {
            $scope.item.picture = files[0];
        };

      $scope.conditions = ['Poor', 'Fair', 'Good', 'Excellent', 'Like New', 'New']

    }]);

'use strict';

var myApp = angular.module('sampleApp', ['AngularFormsModule', 'SampleFormDefinition']);

myApp.controller('myController', ['$scope', 'AngularForms', 'SampleForm',
    function($scope, AngularForms, SampleForm) {

    var form = AngularForms({ scope: $scope, targetId: 'basicForm', form: SampleForm });
    form.inject();

    $scope.sources = [
            { id: 'google', label: 'Google' },
            { id: 'yahoo', label: 'Yahoo!' },
            { id: 'bing', label: 'Bing' },
            { id: 'facebook', label: 'Facebook' },
            { id: 'word', label: 'A friend told me' },
            { id: 'other', label: 'Other' }
            ];

    }]);