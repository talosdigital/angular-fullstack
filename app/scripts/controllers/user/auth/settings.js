'use strict';

angular.module('nodeserverApp')
  .controller('UserAuthSettingsCtrl', function ($scope, User, Auth) {
    $scope.errors = {};

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
        $scope.error = null;
    };

    $scope.changePassword = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
            $scope.alerts = [
                { type: 'success', msg: 'Password successfully changed.' }
            ];
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
        });
      }
		};
  });
