'use strict';

angular.module('nodeserverApp')
    .controller('UserAccountSocialCtrl', function ($scope, $location,$routeParams,$rootScope, Auth) {
        $scope.facebookTitle = 'Connect with facebook';
        $scope.facebooklogout = 'Disconnect with facebook';

        $rootScope.loggedface = false;
        var oauth = $rootScope.currentUser['oauth'];
        if(oauth!=undefined){
            for(var i=0; i < oauth.length; i++){
                if(oauth[i].adapter == 'facebook'){
                     $rootScope.facebookAccount = oauth[i]; 
                     $rootScope.loggedface = true;
                     break;
                }
            }
        }

       
        $scope.$on('event:facebook-success', function (event, args) {
            Auth.mergeAccount({
                facebookId: args.authResponse.userID,
                facebookToken: args.authResponse.accessToken,
                adapter: 'facebook'
            })
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
        $scope.$on('event:facebook-logout', function (event) {
            Auth.unmergeAccount({
            
                adapter: 'facebook',
                facebookToken: $rootScope.facebookToken
            
                })

                .then(function(){
                    $scope.alerts = [
                        { type: 'warning', msg: 'Your account has been successfully unmerged' }
                    ];
                })
                .catch(function(err){
                    $scope.alerts = [
                        { type: 'danger', msg: 'Something is wrong, please try again later' }
                    ];
                });
        });

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
            $scope.error = null;
        };
    });
