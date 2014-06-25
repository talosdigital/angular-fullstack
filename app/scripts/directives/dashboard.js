'use strict';

angular.module('nodeserverApp')

  /**
   * Removes server error when user updates input
   */
  .directive('addressAmount', function () {
    return {
      restrict: 'E',
      template: 'you have <b>{{currentUser.addresses.length}}<span ng-hide="currentUser.addresses.length">0</span></b> addresses register on you Address Book.  <a ui-sref="account.address.view">Edit</a>',
      controller: function($scope , Dashboard){
          $scope.amount = Dashboard.getAddress();
      }
    };
  })
    .directive('welcomeUser', function ($rootScope) {
        return {
            restrict: 'E',
            template: '<p>Hi! <b>{{currentUser.name}}</b> welcome to you dashboard, here you will have a brief look at you recent activity</p>'
        };
    });