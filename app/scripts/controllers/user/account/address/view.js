'use strict';

angular.module('nodeserverApp')
    .controller('UserAccountAddressViewCtrl', function ($scope, $location,$routeParams, Auth, $http) {

    	$scope.errorMessage = false;

    	$scope.getAddresses = function() {
	    	$http.get('api/user/address').success(function(data){
	    		$scope.addresses = data;
	    	}).error(function(data){
	    		$scope.errorMessage = data.message;
	    	}
	    	);
    	}

    	$scope.getAddresses();

    	$scope.delete = function(index){
    		var form = {
                id: index
            };
            form = $.param(form);

            $http({
                    url: 'api/user/address',
                    method: "DELETE",
                    data:  form,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(data) {
                $scope.getAddresses();
                $scope.alerts = [
                    { type: 'success', msg: data.data.message }
                ];
            }, 
            function(data) { 
                $scope.alerts = [
                    { type: 'danger', msg: data.message }
                ];
            });
    	}
    });
