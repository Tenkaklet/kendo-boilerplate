angular.module('boiler').controller('NavigationCtrl', ['$scope', '$window', '$location', function ($scope, $window, $location) {
    
    $scope.logout = function () {
        delete $window.localStorage.user && $window.localStorage.kendo_token;
        $location.path('/');
    };
}]);