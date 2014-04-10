'use strict';

angular.module('nodeserverApp')
  .controller('UserAuthSignupCtrl', function ($scope, $state,$resource, Auth) {
    $scope.user = {};
    $scope.errors = {};
    $scope.$on('event:facebook-success', function (event, args) {

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