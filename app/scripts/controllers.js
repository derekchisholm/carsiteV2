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

function SettingsCtrl() {
    
};

function PricePerGalCtrl($scope, $http, $filter) {
    $http.get('http://api.carsite.local/fillups').
        then(function(data) {
            $scope.fillUps = data.data._embedded.fillups;
            
            $scope.labels = [];
            $scope.seriesA = [];
            $scope.dataSets = [];
            
            for (i = 0; i < $scope.fillUps.length; i++) {
                date = new Date($scope.fillUps[i].date);
                date = $filter("date")(date, "shortDate");
                price = parseFloat($scope.fillUps[i].price);
                
                $scope.labels.push(date);
                $scope.seriesA.push(price.toFixed(3));
            }
            
            $scope.dataSets.push($scope.seriesA);
            $scope.data = $scope.dataSets;
    });
}

function MilesPerGalCtrl($scope, $http, $filter) {
    $http.get('http://api.carsite.local/fillups').
        then(function(data) {
            $scope.fillUps = data.data._embedded.fillups;
            
            $scope.labels = [];
            $scope.seriesA = [];
            $scope.dataSets = [];
            
            for (i = 0; i < $scope.fillUps.length; i++) {
                date = new Date($scope.fillUps[i].date);
                date = moment(date).format('l');
                
                distance = (i > 0) ? $scope.fillUps[i].odometer - $scope.fillUps[i - 1].odometer : 0;
                mpg = (i > 0) ? distance / $scope.fillUps[i].volume : 0;
                
                $scope.labels.push(date);
                $scope.seriesA.push(mpg.toFixed(1));
            }
            
            $scope.dataSets.push($scope.seriesA);
            $scope.data = $scope.dataSets;
    });
}

function FuelListCtrl($scope, $http, moment) {
    $http.get('http://api.carsite.local/fillups').
        then(function(data) {
            $scope.fillUps = data.data._embedded.fillups;
            
            for (i = 0; i < $scope.fillUps.length; i++) {
                $scope.fillUps[i].price = parseFloat($scope.fillUps[i].price).toFixed(2);
                $scope.fillUps[i].volume = parseFloat($scope.fillUps[i].volume).toFixed(2);
                $scope.fillUps[i].cost = $scope.fillUps[i].price * $scope.fillUps[i].volume;
                $scope.fillUps[i].cost = $scope.fillUps[i].cost.toFixed(2);
                $scope.fillUps[i].date = moment($scope.fillUps[i].date).format('l');
            }
    });
};

function NewFillUpController($scope, $http) {
    $http.get('data/fill-ups.json').
        then(function(data) {
            $scope.fillUps = data.data;
            
            $scope.save = function() {
                $http.post('data/fill-ups.json', $scope.fillUps).
                    then(function(data) {
                        
                });
            };
    });
};

angular
    .module('app')
    .controller('DashboardCtrl', DashboardCtrl)
    .controller('SettingsCtrl', SettingsCtrl)
    .controller('FuelListCtrl', FuelListCtrl)
    .controller('PricePerGalCtrl', PricePerGalCtrl)
    .controller('MilesPerGalCtrl', MilesPerGalCtrl)
    .controller('NewFillUpController', NewFillUpController)