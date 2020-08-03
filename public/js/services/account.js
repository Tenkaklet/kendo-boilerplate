angular.module('boiler').factory('Account', ['$http', function($http) {
    return {
        create: user => {
            return $http.post('/auth/register', user);
        },
        login: user => {
            return $http.post('/auth/login', user);
        }
    };
}]);