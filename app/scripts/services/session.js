'use strict';

angular.module('nodeserverApp')
  .factory('Session', function ($resource) {
    return $resource('api/public/session/');
  });
