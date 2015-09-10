/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * DashboardCtrl - controller
 */
function DashboardCtrl() {

    this.userName = 'Example user';
    this.helloText = 'Welcome in SeedProject';
    this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';

};

function PricePerGalCtrl($scope, $http, $filter) {
    $http.get('data/fill-ups.json').
        then(function(data) {
            $scope.fillUps = data.data;
            
            $scope.labels = [];
            $scope.seriesA = [];
            $scope.dataSets = [];
            
            for (i = 0; i < $scope.fillUps.length; i++) {
                date = new Date($scope.fillUps[i].dateTime);
                date = $filter("date")(date, "shortDate");
                price = $scope.fillUps[i].price.toFixed(2);
                
                $scope.labels.push(date);
                $scope.seriesA.push(price);
            }
            
            $scope.dataSets.push($scope.seriesA);
            $scope.data = $scope.dataSets;
    });
}

function FuelListCtrl($scope, $http) {
    $http.get('data/fill-ups.json').
        then(function(data) {
            $scope.fillUps = data.data;
            
            for (i = 0; i < $scope.fillUps.length; i++) {
                price = $scope.fillUps[i].price.toFixed(2);
                volume = $scope.fillUps[i].volume.toFixed(2);
                cost = price * volume;
                $scope.fillUps[i].cost = cost.toFixed(2);                
            }
    });
};

angular
    .module('app')
    .controller('DashboardCtrl', DashboardCtrl)
    .controller('FuelListCtrl', FuelListCtrl)
    .controller('PricePerGalCtrl', PricePerGalCtrl)