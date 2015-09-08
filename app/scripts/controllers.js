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

function FuelCtrl($scope, $http) {
    $http.get('data/fill-ups.json').
        then(function(data) {
            $scope.fillUps = data.data;
    });
};

angular
    .module('app')
    .controller('DashboardCtrl', DashboardCtrl)
    .controller('FuelCtrl', FuelCtrl)