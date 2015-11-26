(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('MilesPerGalController', MilesPerGalController);

    MilesPerGalController.$inject = ['$http'];

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
})();
