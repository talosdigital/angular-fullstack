'use strict';

angular.module('nodeserverApp')
  .controller('UserAccountAddressEditCtrl', function ($scope, $location, $routeParams, Auth, $http, $rootScope ,$stateParams) {

        var addressId = $stateParams.id;
      
        $http.get('api/user/address').success(function(data){
            $scope.user = data[addressId];
            console.log(data);
        }).error(function(data){
            $scope.errorMessage = data.message;
        }
        );

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

        $scope.editAddress = function(){
            var form = {
                id: addressId,
                label: $scope.user.label,
                firstname: $scope.user.firstname,
                lastname: $scope.user.lastname,
                companyName: $scope.user.companyName,
                street: $scope.user.street,
                postCode: $scope.user.postCode,
                city: $scope.user.city,
                state: $scope.user.state,
                country: $scope.user.country
            };
            form = $.param(form);

            $http({
                    url: 'api/user/address',
                    method: "PUT",
                    data:  form,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(data) {
                $scope.alerts = [
                    { type: 'success', msg: data.data.message }
                ];
            }, 
            function(data) { 
                $scope.alerts = [
                    { type: 'danger', msg: data.message }
                ];
            });
        };

  });
