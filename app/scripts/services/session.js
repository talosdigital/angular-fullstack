'use strict';

angular.module('nodeserverApp')
  .factory('Session', function ($resource) {
    return $resource('api/user/auth/login', {},{
    	save:{
                method: 'POST',
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            },

        get:{
        	url: 'api/user/auth/logout',
            method: 'GET'
        }
    }

    );
  });

angular.module('nodeserverApp')
   .factory('Logout', function ($resource) {
    return $resource('api/user/auth/logout', {},{
        delete:{
            method: 'GET'
        }
    }

    );
  });
