'use strict';

angular.module('nodeserverApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id', {
      id: '@id'
    }, { //parameters default
      update: {
        method: 'PUT',
        params: {}
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  })
    .factory('UserValid', function ($resource) {
        return $resource('/api/email/:email', {email:'@email'});
    });
