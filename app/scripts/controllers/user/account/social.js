'use strict';

angular.module('nodeserverApp')
    .controller('UserAccountSocialCtrl', function ($scope, $location,$routeParams, Auth) {
        $scope.$on('event:facebook-success', function (event, args) {
            Auth.mergeAccount(args , function(callback){
                console.log(callback);
            })
        });
    });
