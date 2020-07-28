angular.module('boiler', ['ngRoute', 'ngSanitize', 'kendo.directives'])
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
    })
    
}]);