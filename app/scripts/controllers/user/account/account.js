'use strict';

angular.module('nodeserverApp')
  .controller('UserAccountAccountCtrl', function ($scope, $location,$routeParams, Auth, $http, $rootScope) {

        $scope.changepass = false;

        $scope.submittedpass = false;

        $http({
                url: 'api/user/profile',
                method: "GET",
        })
        .then(function(data) {

            $scope.user = {}
            $scope.user.name = data.data.name;
            $scope.user.email = data.data.email;

        }, 
        function(data) { 
            $scope.alerts = [
                { type: 'danger', msg: data.message }
            ];
        });

        $scope.login = function(form) {

            $scope.submitted = true;

            if($scope.changepass){
                $scope.submittedpass = true;
            }

            if(form.$valid) {
                
                var form = {
                    name: $scope.user.name,
                    email: $scope.user.email
                };
                form = $.param(form);

                $http({
                        url: 'api/user/profile/change-info',
                        method: "POST",
                        data:  form,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                .then(function(data) {
                    $rootScope.currentUser.name = $scope.user.name;
                    $scope.alerts = [
                        { type: 'success', msg: data.data.message }
                    ];
                }, 
                function(data) { 
                    $scope.alerts = [
                        { type: 'danger', msg: data.message }
                    ];
                });
              
                $scope.submitted = false;
                $scope.submittedpass = false;
            }
            else{
                $scope.alerts = [
                    { type: 'danger', msg: 'Please fill all required fields' }
                ];
            }
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
            $scope.error = null;
        };

        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

  });
