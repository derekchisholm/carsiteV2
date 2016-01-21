(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['auth', 'store', '$location'];
    
    function LoginController(auth, store, $location) {
        var vm = this;
        
        vm.submit = submit;
        
        function submit() {
            console.log("Made it into the submit function");
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
