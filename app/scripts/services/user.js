'use strict';

angular.module('nodeserverApp')
    .factory('User', function ($resource) {
        return $resource('api/user/auth/signup/:id', {

        }, { //parameters default
            update: {
                method: 'PUT',
                params: {id: '@id'},
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            },
            get: {
                method: 'GET',
                params: {
                    id:'me'
                }
            },
            save:{
                method: 'POST',
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        });
    })
    .factory('UserMerge', function ($resource) {
        return $resource('api/users/merge', {

        },{
            update: {
                method: 'PUT',
                params: {id: '@id'}
            }
        });
    })
    .factory('facebookCheck', function ($resource) {
        return $resource('api/users/check', {

        },{
            update: {
                method: 'PUT',
                params: {id: '@id'}
            }
        });
    });