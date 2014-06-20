'use strict';

angular.module('nodeserverApp')
  .factory('Auth', function Auth($location, $rootScope,$http, Session, Logout, User, UserMerge, Passwords, UserUnMerge, facebookCheck, $cookieStore, $state) {

    // Get currentUser from cookie
    $rootScope.currentUser = $cookieStore.get('user') || null;
    if($rootScope.currentUser){
      $cookieStore.remove('user');
    }
    else{
      $http.get('api/user/profile').success(function(data) {
        $rootScope.currentUser = data;
        $state.transitionTo("account.welcome");
      });
    }

    var passchange = null;

    return {

      /**
       * Authenticate user
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;
        
        user = $.param(user);
        return Session.save(user, function(user) {
          $rootScope.currentUser = user;
          return cb();
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Unauthenticate user
       *
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      logout: function(callback) {
        var cb = callback || angular.noop;

        return Logout.delete(function() {
            $rootScope.currentUser = null;
            return cb();
          },
          function(err) {
            return cb(err);
          }).$promise;
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
        user = $.param(user);
        console.log(user);
        var cb = callback || angular.noop;

        return User.save(user,
          function(userResponse) {
            $rootScope.currentUser = userResponse;
            return cb(user);
          },
          function(err) {
            return cb(err);
          }).$promise;
      },
      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(passwords, callback) {
        var cb = callback || angular.noop;
        passwords = $.param(passwords);

        return Passwords.update(passwords, 
          function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      setPass: function(state){
          passchange = state;
      },
      getPass: function(){
          return passchange;
      },

        //Merge Facebook account with current one
        mergeAccount: function(user, callback) {
            var cb = callback || angular.noop;
            user = $.param(user);

            return UserMerge.update(user,
                function(success) {
                    return cb(success);
                },
                function(err) {
                    return cb(err);
                }).$promise;
        },

        unmergeAccount: function(user, callback) {
            var cb = callback || angular.noop;
            user = $.param(user);

            return UserUnMerge.update(user,
                function(success) {
                    return cb(success);
                },
                function(err) {
                    return cb(err);
                }).$promise;
        },

        checkfacebook: function(user, callback){
            var cb = callback || angular.noop;

            return facebookCheck.update(user,
                function(success) {
                    return cb(success);
                },
                function(err) {
                    return cb(err);
                }).$promise;
        },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      currentUser: function() {
        return User.get();
      },

      /**
       * Simple check to see if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {

        var user = $rootScope.currentUser;
        return !!user;
      }
    };
  });