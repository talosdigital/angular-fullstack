'use strict';

angular.module('nodeserverApp')
    .controller('UserAuthSocialFacebookCtrl', function ($scope, $state,$rootScope, $location, $timeout, Auth, Facebook) {
        // Define user empty data :/
        $scope.userFacebook = {};

        // Defining user logged status
        $scope.logged = false;
        
        // And some fancy flags to display messages upon user status change
        $scope.byebye = false;
        $scope.salutation = false;

        /**
         * Watch for Facebook to be ready.
         * There's also the event that could be used
         */
        $scope.$watch(
            function() {
                return Facebook.isReady();
            },
            function(newVal) {
                if (newVal)
                    $scope.facebookReady = true;
            }
        );

        /**
         * IntentLogin
         */
        $scope.IntentLogin = function() {
            Facebook.getLoginStatus(function(response) {
                if (response.status == 'connected') {
                    Auth.createUser({
                        id:response.authResponse.userID,
                        token:response.authResponse.accessToken,
                        facebook: true
                    })
                    .then( function() {
                        // Account created, redirect to home
                        $state.transitionTo("account.welcome");
                    })
                    .catch( function(err) {
                        console.log(err);
                    });
                    $scope.logged = true;
                    $scope.me();
                }
                else{
                    $scope.login();
                }
            });
        };

        /**
         * Login
         */
        $scope.login = function() {
            Facebook.login(function(response) {
                if (response.status == 'connected') {
                    $scope.logged = true;
                    $scope.me();
                }

            },{scope: 'email'});
        };

        /**
         * me
         */
        $scope.me = function() {
            Facebook.api('/me', function(response) {
                /**
                 * Using $scope.$apply since this happens outside angular framework.
                 */
                $scope.$apply(function() {
                    $scope.userFacebook = response;
                    //console.log(response);
                    $rootScope.$broadcast('event:facebook-success', response);
                });

            });
        };

        /**
         * Logout
         */
        $scope.logout = function() {
            Facebook.logout(function() {
                $scope.$apply(function() {
                    $scope.userFacebook   = {};
                    $scope.logged = false;
                });
            });
        }

        $scope.$on('Facebook:statusChange', function(ev, data) {
            //console.log('Status: ', data);
            if (data.status == 'connected') {
                $scope.$apply(function() {
                    $scope.salutation = true;
                    $scope.byebye     = false;
                });
            } else {
                $scope.$apply(function() {
                    $scope.salutation = false;
                    $scope.byebye     = true;

                    // Dismiss byebye message after two seconds
                    $timeout(function() {
                        $scope.byebye = false;
                    }, 2000)
                });
            }


        });

    });