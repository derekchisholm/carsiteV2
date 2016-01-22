(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['auth', '$scope'];
    
    function LoginController(auth, $scope) {
        //$scope.auth = auth;
        
        $scope.signin = function() {
            auth.signin({
                authParams: {
                    scope: 'openid name email'
                }
            });
        }
    }
    
}) ();
