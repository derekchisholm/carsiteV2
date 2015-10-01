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
                $scope.fillUps[i].date = moment($scope.fillUps[i].date).format('l');
            }
    });
};

function NewFillUpController($scope, $http, $location) {
    $scope.formData = {};
    
    $scope.create = function() {
        console.log(this.formData);
    };
    
    $scope.cancel = function() {
        $location.path('/fuel/vehicle');
    };
    
    $scope.calcCost = function() {
        if ($scope.formData.price > 0 && $scope.formData.volume > 0) {
            price = parseFloat($scope.formData.price).toFixed(2);
            volume = parseFloat($scope.formData.volume).toFixed(2);
            cost = price * volume;
            $scope.formData.cost = cost.toFixed(2);
        }
    };
};

angular
    .module('app')
    .controller('DashboardCtrl', DashboardCtrl)
    .controller('SettingsCtrl', SettingsCtrl)
    .controller('FuelListCtrl', FuelListCtrl)
    .controller('PricePerGalCtrl', PricePerGalCtrl)
    .controller('MilesPerGalCtrl', MilesPerGalCtrl)
    .controller('NewFillUpController', NewFillUpController)