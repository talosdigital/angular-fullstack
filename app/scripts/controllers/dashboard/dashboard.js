'use strict';

angular.module('nodeserverApp')
  .controller('DashboardCtrl', function ($scope, $location,$routeParams, Auth) {

        if($routeParams.sub){
            switch($routeParams.sub)
            {
                case 'index':
                    $scope.templateUrl = 'partials/dashboard/addressview';
                    break;
                case 'new':
                    $scope.templateUrl = 'partials/dashboard/address';
                    break;
                default:
                    $scope.templateUrl = 'partials/dashboard/welcome';
            }
        }
        else{
            switch($routeParams.url)
            {
                case 'main':
                    $scope.templateUrl = 'partials/dashboard/welcome';
                    break;
                case 'account':
                    $scope.templateUrl = 'partials/dashboard/account';
                    break;
                default:
                    $scope.templateUrl = 'partials/dashboard/welcome';
            }
        }

  });
