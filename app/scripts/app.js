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
            templateUrl: 'partials/main',
            controller: 'MainCtrl'
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'partials/dashboard/main',
            controller: 'DashboardCtrl'
        })
        .state('dashboard.welcome', {
            url: '/welcome',
            templateUrl: 'partials/dashboard/welcome'
        })
        .state('dashboard.account', {
            url: '/account',
            templateUrl: 'partials/dashboard/account',
            controller: 'AccountCtrl'
        })
        .state('dashboard.address', {
            url: '/address',
            templateUrl: 'partials/dashboard/address/index'

        })
        .state('dashboard.address.view', {
            url: '/view',
            templateUrl: 'partials/dashboard/address/view',
            controller: 'AddressViewCtrl'

        })
        .state('dashboard.address.new', {
            url: '/new',
            templateUrl: 'partials/dashboard/address/new',
            controller: 'AddressCtrl'

        })
        .state('login', {
            url: '/login',
            templateUrl: 'partials/login',
            controller: 'LoginCtrl'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'partials/signup',
            controller: 'SignupCtrl'
        })
        .state('settings', {
            url: '/settings',
            templateUrl: 'partials/settings',
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
            $location.path('/login');
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