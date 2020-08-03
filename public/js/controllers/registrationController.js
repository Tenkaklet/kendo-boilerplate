angular.module('boiler').controller('RegistrationCtrl', ['$scope', 'Account', '$window', '$rootScope', '$location', function ($scope, Account, $window, $rootScope, $location) {

    // Register User
    $scope.register = function (user) {
        Account.create(user)
        .then(user => {
            $rootScope.currentUser = user.data.user.name;
            $window.localStorage.user = JSON.stringify(user.data);
            $location.path('/');
        })
        .catch(err => {
            $scope.error = err.data;
        });
    };
}]);