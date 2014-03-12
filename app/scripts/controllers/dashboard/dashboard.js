'use strict';

angular.module('nodeserverApp')
  .controller('DashboardCtrl', function ($scope, $location,$routeParams, Auth) {

        switch($routeParams.url)
        {
            case 'main':
                $scope.templateUrl = 'partials/dashboard/welcome';
                break;
            case 'address':
                $scope.templateUrl = 'partials/dashboard/address';
                break;
            default:
                $scope.templateUrl = 'partials/dashboard/welcome';
        }
  });
