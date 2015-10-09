(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('DashboardController', DashboardController)
        .controller('FuelListController', FuelListController)
        .controller('MilesPerGalController', MilesPerGalController)
        .controller('NewFillUpController', NewFillUpController)
        .controller('PricePerGalController', PricePerGalController)
        .controller('SettingsController', SettingsController);
    
    DashboardController.$inject = [];
    FuelListController.$inject = ['$http', 'moment'];
    MilesPerGalController.$inject = ['$http'];
    NewFillUpController.$inject = ['$http', '$location'];
    PricePerGalController.$inject = ['$http', '$filter'];
    SettingsController.$inject = [];
    
    function DashboardController() {
        var vm = this;
        
        vm.userName = 'Example user';
        vm.helloText = 'Welcome in SeedProject';
        vm.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';
    }
    
    function FuelListController($http, moment) {
        var vm = this;
        
        $http.get('http://api.carsite.local/fillups').
            then(function(data) {
                vm.fillUps = data.data._embedded.fillups;
                
                var i = 0;

                for (i = 0; i < vm.fillUps.length; i++) {
                    vm.fillUps[i].price = parseFloat(vm.fillUps[i].price).toFixed(2);
                    vm.fillUps[i].volume = parseFloat(vm.fillUps[i].volume).toFixed(2);
                    vm.fillUps[i].date = moment(vm.fillUps[i].date).format('l');
                }
        });
    }
    
    function MilesPerGalController($http) {
        var vm = this;
        
        $http.get('http://api.carsite.local/fillups').
            then(function(data) {
                vm.fillUps = data.data._embedded.fillups;

                vm.labels = [];
                vm.seriesA = [];
                vm.dataSets = [];
                
                var i = 0;
                var date = new Date;
                var distance;
                var mpg;

                for (i = 0; i < vm.fillUps.length; i++) {
                    date = new Date(vm.fillUps[i].date);
                    date = moment(date).format('l');

                    distance = (i > 0) ? vm.fillUps[i].odometer - vm.fillUps[i - 1].odometer : 0;
                    mpg = (i > 0) ? distance / vm.fillUps[i].volume : 0;

                    vm.labels.push(date);
                    vm.seriesA.push(mpg.toFixed(1));
                }

                vm.dataSets.push(vm.seriesA);
                vm.data = vm.dataSets;
        });
    }
    
    function NewFillUpController($http, $location) {
        var vm = this;
        
        vm.create = create;
        vm.cancel = cancel;
        vm.calcCost = calcCost;
        
        vm.formData = {};

        function create() {
            vm.formData.date = vm.formData.date.toLocaleString();
            
            $http.post('http://api.carsite.local/fillups', vm.formData).
                then(function(data, status, headers) {
                    $location.path('/fuel/vehicle');
            }, function (data) {
                    alert(data.data.detail);
            });
        };

        function cancel() {
            $location.path('/fuel/vehicle');
        };

        function calcCost() {
            var price;
            var volume;
            var cost;
            
            if (vm.formData.price > 0 && vm.formData.volume > 0) {
                price = parseFloat(vm.formData.price).toFixed(2);
                volume = parseFloat(vm.formData.volume).toFixed(2);
                cost = price * volume;
                vm.formData.cost = cost.toFixed(2);
            }
        };
    }
    
    function PricePerGalController($http, $filter) {
        var vm = this;
        
        $http.get('http://api.carsite.local/fillups').
            then(function(data) {
                vm.fillUps = data.data._embedded.fillups;

                vm.labels = [];
                vm.seriesA = [];
                vm.dataSets = [];
                
                var i = 0;
                var date = new Date();
                var price;
                
                for (i = 0; i < vm.fillUps.length; i++) {
                    date = new Date(vm.fillUps[i].date);
                    date = $filter("date")(date, "shortDate");
                    price = parseFloat(vm.fillUps[i].price);

                    vm.labels.push(date);
                    vm.seriesA.push(price.toFixed(3));
                }

                vm.dataSets.push(vm.seriesA);
                vm.data = vm.dataSets;
        });
    }
    
    function SettingsController() {
    }   
})();
