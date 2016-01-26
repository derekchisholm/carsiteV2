(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('MilesPerGalController', MilesPerGalController);

    MilesPerGalController.$inject = ['$scope', '$http'];

    function MilesPerGalController($scope, $http) {
        $http.get('http://api.carsite.com/api/fillups').
            then(function(data) {
                $scope.fillUps = data.data;

                $scope.chart = [];
                $scope.chart.labels = [];
                $scope.chart.seriesA = [];
                $scope.chart.dataSets = [];
                
                var i = 0;
                var date = new Date;
                var distance;
                var mpg;

                for (i = 0; i < $scope.fillUps.length; i++) {
                    date = new Date($scope.fillUps[i].date);
                    date = moment(date).format('l');

                    distance = (i > 0) ? $scope.fillUps[i].odometer - $scope.fillUps[i - 1].odometer : 0;
                    mpg = (i > 0) ? distance / $scope.fillUps[i].volume : 0;

                    $scope.chart.labels.push(date);
                    $scope.chart.seriesA.push(mpg.toFixed(1));
                }

                $scope.chart.dataSets.push($scope.chart.seriesA);
                $scope.chart.data = $scope.chart.dataSets;
        });
    }
})();
