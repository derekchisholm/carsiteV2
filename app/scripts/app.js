(function () {
    'use strict';
    
    angular
    .module('app', [
        'ui.router',                    
        'ui.bootstrap',                 
        'ui.footable',
        'chart.js',
        'ncy-angular-breadcrumb',
        'datePicker',
        'angularMoment',
        'auth0',                    //Cloud authentication provider
        'angular-storage',
        'angular-jwt'
    ]);
})();
