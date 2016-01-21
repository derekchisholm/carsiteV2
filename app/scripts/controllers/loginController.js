(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$http', 'auth', 'store', '$location'];
    
    function LoginController($scope, $http, auth, store, $location) {
        $scope.login = function() {
            auth.signin({}, function (profile, token) {
                // Success callback
                store.set('profile', profile);
                store.set('token', token);
                $location.path('/fuel/vehicle');
            }, function (error) {
                // Error callback
                console.log("There was an error logging in", error);
            });
        };
    }
    
}) ();
