'use strict';

angular.module('nodeserverApp')
  .controller('AddressCtrl', function ($scope, $location,$routeParams, Auth) {
        $scope.login = function(form) {
            $scope.submitted = true;

            console.log(form);

            if(form.$valid) {
                console.log($scope.user);
            }
            else{
                var required = '';
                for (var i = 0 ; i < form.$error.required.length; i++)
                {
                    required += form.$error.required[i].$name + ' ';
                }
                $scope.alerts = [
                    { type: 'danger', msg: 'Oh snap! looks like '+required+' are missing.' }
                ];
                $scope.error = 'has-error';
            }
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
            $scope.error = null;
        };

  });
