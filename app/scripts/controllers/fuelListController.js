(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('FuelListController', FuelListController);

    FuelListController.$inject = ['$scope', '$http', 'moment'];

    function FuelListController($scope, $http, moment) {
        $http.get('http://api.carsite.com/api/fillups').
            then(function(data) {
                $scope.fillUps = data.data;

                var i = 0;

                for (i = 0; i < $scope.fillUps.length; i++) {
                    $scope.fillUps[i].price = parseFloat($scope.fillUps[i].price).toFixed(2);
                    $scope.fillUps[i].volume = parseFloat($scope.fillUps[i].volume).toFixed(2);
                    $scope.fillUps[i].date = moment($scope.fillUps[i].date).format('l');
                }
        });
    }
})();
    