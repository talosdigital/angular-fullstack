'use strict';

angular.module('nodeserverApp')
  .controller('AddressCtrl', function ($scope, $location,$routeParams, Auth) {

        $scope.login = function(form) {
            console.log(form);
            if(form.$valid) {
                console.log($scope.user);
            }
        };

  });
