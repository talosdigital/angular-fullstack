'use strict';

angular.module('nodeserverApp')
    .controller('UserAccountAddressViewCtrl', function ($scope, $location,$routeParams, Auth, $http) {

    	$scope.errorMessage = false;

    	$http.get('api/user/address').success(function(data){
    		$scope.addresses = data;
    	}).error(function(data){
    		$scope.errorMessage = data.message;
    	}
    	);

    });
