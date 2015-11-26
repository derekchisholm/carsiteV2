(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('ServiceListController', ServiceListController);
    
    ServiceListController.$inject = ['$http'];
    
    function ServiceListController($http) {
        var vm = this;
        
        $http.get('http://api.carsite.local/service').
            then(function(data) {
                vm.service = data.data._embedded.service;
        });
    }
    
})();
