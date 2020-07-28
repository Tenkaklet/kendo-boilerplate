angular.module('boiler').controller('HomeCtrl', ['$scope', function ($scope) {
    $scope.message = "Hello & Welcome!";
    const data = new kendo.data.DataSource({
        data: [
            { Name: "Albania" },
            { Name: "Andorra" },
            { Name: "Armenia" },
            { Name: "Austria" },
            { Name: "Azerbaijan" },
            { Name: "Belarus" },
            { Name: "Belgium" },
            { Name: "Bosnia & Herzegovina" },
            { Name: "Bulgaria" },
            { Name: "Croatia" },
            { Name: "Cyprus" },
            { Name: "Czech Republic" },
            { Name: "Denmark" },
        ]
    });
    $scope.gridOptions = {
        dataSource: data,
        sortable: true,
        columns: [
            { field: 'Name', title: 'Name' }
        ]
    };

    $scope.onChange = function () {
        $scope.pickedDate = $scope.datePicker.value();
    };
}]);