'use strict';

angular.module('nodeserverApp')
    .factory('User', function ($resource) {
        return $resource('/api/users/:id', {

        }, { //parameters default
            update: {
                method: 'PUT',
                params: {id: '@id'}
            },
            get: {
                method: 'GET',
                params: {
                    id:'me'
                }
            }
        });
    })