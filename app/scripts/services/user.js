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
    .factory('Passwords', function ($resource) {
        return $resource('api/user/profile/change-password', {

        }, { //parameters default
            update: {
                method: 'POST',
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        });
    })
    .factory('UserMerge', function ($resource) {
        return $resource('api/user/auth/merge', {

        },{
            update: {
                method: 'POST',
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        });
    })
    .factory('UserUnMerge', function ($resource) {
        return $resource('api/user/auth/unmerge', {

        },{
            update: {
                method: 'POST',
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}
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