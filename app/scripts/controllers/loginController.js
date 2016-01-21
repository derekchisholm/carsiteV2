(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['auth', 'store', '$location'];
    
    function LoginController(auth, store, $location) {
        var vm = this;
        
        vm.submit = submit;
        vm.username = '';
        vm.password = '';
        
        function onLoginSuccess(profile, token) {
            store.set('profile', profile);
            store.set('token', token);
            $location.path('/');
            vm.loading = false;
        }
        
        function onLoginFailed() {
            vm.message.text = 'invalid credentials';
            vm.loading = false;
        }
        
        function submit() {
            vm.loading = true;
            auth.signin({
                connection: 'Username-Password-Authentication',
                username: vm.username,
                password: vm.password,
                authParams: {
                    scope: 'openid name email'
                }
                
            }, onLoginSuccess, onLoginFailed);
        };
    }
    
}) ();
