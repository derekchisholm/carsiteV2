(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('FuelListController', FuelListController);

    FuelListController.$inject = ['$http', 'moment'];

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
})();
    