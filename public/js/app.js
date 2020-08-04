
const app = angular.module('boiler', ['ngRoute', 'ngSanitize', 'kendo.directives', 'ui.bootstrap']);
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
    })
    .when('/register', {
        templateUrl: 'partials/registration.html',
        controller: 'RegistrationCtrl'
    })
    .when('/dashboard', {
        templateUrl: 'partials/dashboard.html',
        controller: 'DashboardCtrl',
        resolve: { loginRequired }
    })
}])

function loginRequired($location, $window) {
    console.log('login required');
    const token = $window.localStorage.kendo_token;
    console.log(token);
    if(!token) {
        $location.path('/register');
    } 
}


app.run(function($rootScope, $window) {  
    if($window.localStorage.user) {
        $rootScope.currentUser = JSON.parse($window.localStorage.user);
    }    
});