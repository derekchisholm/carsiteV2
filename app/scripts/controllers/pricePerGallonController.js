(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('PricePerGalController', PricePerGalController);

    PricePerGalController.$inject = ['$http', '$filter'];

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
})();
