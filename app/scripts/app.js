'use strict';

angular.module('nodeserverApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'ui.router'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider , $stateProvider , $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'partials/user/main',
            controller: 'MainCtrl'
        })
        .state('account', {
            url: '/user/account',
            templateUrl: 'partials/user/dashboard/main',
            controller: 'UserDashboardDashboardCtrl'
        })
        .state('account.welcome', {
            url: '/index',
            templateUrl: 'partials/user/dashboard/welcome',
            controller: 'UserDashboardWelcomeCtrl'
        })
        .state('account.information', {
            url: '/information',
            templateUrl: 'partials/user/dashboard/account',
            controller: 'UserDashboardAccountCtrl'
        })
        .state('account.address', {
            url: '/address',
            templateUrl: 'partials/user/dashboard/address/index'

        })
        .state('account.address.view', {
            url: '/view',
            templateUrl: 'partials/user/dashboard/address/view',
            controller: 'UserDashboardAddressViewCtrl'

        })
        .state('account.address.new', {
            url: '/new',
            templateUrl: 'partials/user/dashboard/address/new',
            controller: 'UserDashboardAddressNewCtrl'

        })
        .state('login', {
            url: '/user/login',
            templateUrl: 'partials/user/login',
            controller: 'LoginCtrl'
        })
        .state('signup', {
            url: '/user/signup',
            templateUrl: 'partials/user/signup',
            controller: 'SignupCtrl'
        })
        .state('settings', {
            url: '/user/settings',
            templateUrl: 'partials/user/settings',
            controller: 'SettingsCtrl',
            authenticate: true
        });

    $urlRouterProvider.otherwise("/");

    $locationProvider.html5Mode(true);
      
    // Intercept 401s and 403s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401 || response.status === 403) {
            $location.path('/user/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
    .run(function ($rootScope, $state, Auth) {
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
            if (toState.authenticate && !Auth.isLoggedIn()){
                // User isn’t authenticated
                $state.transitionTo("login");
                event.preventDefault();
            }
        });
    });