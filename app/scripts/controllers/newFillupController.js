(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('NewFillUpController', NewFillUpController);

    NewFillUpController.$inject = ['$http', '$location'];

    function NewFillUpController($http, $location) {
        var vm = this;
        
        vm.create = create;
        vm.cancel = cancel;
        vm.calcCost = calcCost;
        
        vm.formData = {};

        function create() {
            vm.formData.date = vm.formData.date.toLocaleString();
            
            if($('[name="partialCheck"]').prop('checked', false)){
                vm.formData.partial = 'N';
            } else {
                vm.formData.partial = 'Y';
            }
            
            if($('[name="missedCheck"]').prop('checked', false)){
                vm.formData.missed = 'N';
            } else {
                vm.formData.missed = 'Y';
            }
            
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
                price = parseFloat(vm.formData.price);
                volume = parseFloat(vm.formData.volume);
                cost = price * volume;
                vm.formData.cost = cost.toFixed(2);
            }
        };
    }
})();
