'use strict';

angular.module('nodeserverApp')
    .controller('UserAccountSocialCtrl', function ($scope, $location,$routeParams,$rootScope, Auth) {
        console.log($rootScope.currentUser);
        $scope.facebookTitle = 'Connect with facebook';
        $scope.isFacebook = true;
        $scope.$on('event:facebook-success', function (event, args) {
            Auth.mergeAccount(args)
            .then(function(){
                $scope.alerts = [
                    { type: 'success', msg: 'Your account has been successfully merged' }
                ];
            })
            .catch(function(err){
                $scope.alerts = [
                    { type: 'danger', msg: 'Something is wrong, please try again later' }
                ];
            });
        });
        $scope.unmerge = function(){
            Auth.unmergeAccount()
                .then(function(){
                    $scope.alerts = [
                        { type: 'success', msg: 'Your account has been successfully unmerged' }
                    ];
                })
                .catch(function(err){
                    $scope.alerts = [
                        { type: 'danger', msg: 'Something is wrong, please try again later' }
                    ];
                });
        };
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
            $scope.error = null;
        };
    });
