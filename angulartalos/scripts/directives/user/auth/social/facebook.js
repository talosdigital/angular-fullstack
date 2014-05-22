'use strict';

angular.module('nodeserverApp')

/**
 * Removes server error when user updates input
 */
    .directive('facebookLogin', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/partials/user/auth/social/facebook.html',
            controller: 'UserAuthSocialFacebookCtrl'
        };
    });