(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('LogoutController', LogoutController);

    LogoutController.$inject = ['$scope', 'auth', 'store', '$location'];
    
    function LogoutController($scope, auth, store, $location) {
        $scope.logout = function() {
            auth.signout();
            store.remove('profile');
            store.remove('token');
            $location.path('/');
        };
    }
    
}) ();
