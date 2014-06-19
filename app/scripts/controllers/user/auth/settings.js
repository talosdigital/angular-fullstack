'use strict';

angular.module('nodeserverApp')
  .controller('UserAuthSettingsCtrl', function ($scope,$state,$rootScope, User, Auth) {
    $scope.errors = {};

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
        $scope.error = null;
    };

    $scope.changePassword = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.changePassword( {
          currentPassword: $scope.user.oldPassword,
          newPassword: $scope.user.newPassword,
          newPasswordVerify: $scope.user.newPassword
        })
        .then( function() {
            Auth.setPass(true);
            $state.transitionTo("account.welcome");
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
        });
      }
		};
  });
