'use strict';

angular.module('nodeserverApp')
  .factory('User', function ($resource) {
    return $resource('/api/users',
        { //parameters default
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
  });
