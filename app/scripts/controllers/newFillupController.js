(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('NewFillUpController', NewFillUpController);

    NewFillUpController.$inject = ['$scope', '$http', '$location'];

    function NewFillUpController($scope, $http, $location) {

        $scope.create = create;
        $scope.cancel = cancel;
        $scope.calcCost = calcCost;
        
        $scope.formData = {};

        function create() {
            $scope.formData.date = $scope.formData.date.toLocaleString();
            
            if($('[name="partialCheck"]').prop('checked', false)){
                $scope.formData.partial = 'N';
            } else {
                $scope.formData.partial = 'Y';
            }
            
            if($('[name="missedCheck"]').prop('checked', false)){
                $scope.formData.missed = 'N';
            } else {
                $scope.formData.missed = 'Y';
            }
            
            $http.post('http://api.carsite.com/api/fillups', $scope.formData).
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
            
            if ($scope.formData.price > 0 && $scope.formData.volume > 0) {
                price = parseFloat($scope.formData.price);
                volume = parseFloat($scope.formData.volume);
                cost = price * volume;
                $scope.formData.cost = cost.toFixed(2);
            }
        };
    }
})();
