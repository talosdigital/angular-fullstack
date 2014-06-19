'use strict';

angular.module('nodeserverApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'ui.router',
  'facebook',
  'directive.g+signin'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider , $stateProvider , $urlRouterProvider, FacebookProvider) {

    FacebookProvider.init('324410064378636');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/partials/application/main.html',
            controller: 'MainCtrl'
        })
        .state('account', {
            url: '/user/account',
            templateUrl: 'views/partials/user/account/main.html',
            controller: 'UserAccountDashboardCtrl'
        })
        .state('account.welcome', {
            url: '/index',
            templateUrl: 'views/partials/user/account/welcome.html',
            controller: 'UserAccountWelcomeCtrl'
        })
        .state('account.information', {
            url: '/information',
            templateUrl: 'views/partials/user/account/account.html',
            controller: 'UserAccountAccountCtrl',
            authenticate: true
        })
        .state('account.address', {
            url: '/address',
            templateUrl: 'views/partials/user/account/address/index.html',
            authenticate: true

        })
        .state('account.address.view', {
            url: '/view',
            templateUrl: 'views/partials/user/account/address/view.html',
            controller: 'UserAccountAddressViewCtrl',
            authenticate: true

        })
        .state('account.address.new', {
            url: '/new',
            templateUrl: 'views/partials/user/account/address/new.html',
            controller: 'UserAccountAddressNewCtrl',
            authenticate: true

        })
        .state('account.social', {
            url: '/social',
            templateUrl: 'views/partials/user/account/social.html',
            controller: 'UserAccountSocialCtrl',
            authenticate: true

        })
        .state('login', {
            url: '/user/auth/login',
            templateUrl: 'views/partials/user/auth/login.html',
            controller: 'UserAuthLoginCtrl'
        })
        .state('signup', {
            url: '/user/auth/signup',
            templateUrl: 'views/partials/user/auth/signup.html',
            controller: 'UserAuthSignupCtrl'
        })
        .state('settings', {
            url: '/user/auth/settings',
            templateUrl: 'views/partials/user/auth/settings.html',
            controller: 'UserAuthSettingsCtrl',
            authenticate: true
        });

    $urlRouterProvider.otherwise("/");

    $locationProvider.html5Mode(false);

    // Intercept 401s and 403s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location','$injector', function($q, $location , $injector) {
      return {
        'responseError': function(response) {
          if(response.status === 401 || response.status === 403) {
              $injector.get('$state').transitionTo('login');
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