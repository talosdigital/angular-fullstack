'use strict';

angular.module('nodeserverApp')
  .controller('UserAuthSignupCtrl', function ($scope, $state, Auth) {
    $scope.user = {};
    $scope.errors = {};
    $scope.$on('event:facebook-success', function (event, args) {
        console.log(args);
        Auth.facebookLogin({
            email: args.email
        })
        .then( function(success) {
            console.log(success);
        })
        .catch( function(err) {
            if(err.status == 404){
                Auth.createUser({
                    name: args.name,
                    email: args.email,
                    password: args.id
                })
                .then( function() {
                    // Account created, redirect to home
                    $state.transitionTo("account.welcome");
                })
                .catch( function(err) {
                    err = err.data;
                    $scope.errors = {};

                    // Update validity of form fields that match the mongoose errors
                    angular.forEach(err.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });
            }
        });
    });

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
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.type;
          });
        });
      }
    };
  });