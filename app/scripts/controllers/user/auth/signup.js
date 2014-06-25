'use strict';

angular.module('nodeserverApp')
  .controller('UserAuthSignupCtrl', function ($scope, $state,$rootScope,$resource, Auth) {
    $scope.facebookTitle = 'Sign up with facebook';
    $scope.facebooklogout = 'Please wait';
    $scope.user = {};
    $scope.errors = {};
        $rootScope.loggedface = false;
    $scope.$on('event:facebook-success', function (event, args) {
        $rootScope.facebookToken = args.authResponse.accessToken;
        /*Auth.login({
            email:args.authResponse.userID,
            password:args.authResponse.accessToken,
            facebook: true
        })
            .then( function() {
                // Logged in, redirect to home
                $state.transitionTo("account.welcome");
            })
            .catch( function(err) {
                console.log(err);*/
        Auth.createUser({
            facebookId:args.authResponse.userID,
            facebookToken:args.authResponse.accessToken,
            adapter: 'facebook'
        })
            .then( function() {
                // Account created, redirect to home
                $state.transitionTo("account.welcome");
            })
            .catch( function(err) {
                console.log(err);
            });
    });

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
      $scope.error = null;
    };
    
    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $state.transitionTo("account.welcome");
        })
        .catch( function(data) {
          $scope.alerts = [
                { type: 'warning', msg: data.data.message }
                ];
        });
      }
    };
  });