(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('PricePerGalController', PricePerGalController);

    PricePerGalController.$inject = ['$scope', '$http', '$filter'];

    function PricePerGalController($scope, $http, $filter) {
        $http.get('http://api.carsite.com/api/fillups').
            then(function(data) {
                $scope.fillUps = data.data;

                $scope.chart = [];
                $scope.chart.labels = [];
                $scope.chart.seriesA = [];
                $scope.chart.dataSets = [];
                
                var i = 0;
                var date = new Date();
                var price;
                
                for (i = 0; i < $scope.fillUps.length; i++) {
                    date = new Date($scope.fillUps[i].date);
                    date = $filter("date")(date, "shortDate");
                    price = parseFloat($scope.fillUps[i].price);

                    $scope.chart.labels.push(date);
                    $scope.chart.seriesA.push(price.toFixed(3));
                }

                $scope.chart.dataSets.push($scope.chart.seriesA);
                $scope.chart.data = $scope.chart.dataSets;
        });
    }
})();
