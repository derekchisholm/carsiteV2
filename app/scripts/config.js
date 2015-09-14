/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written stat for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/index/dashboard");

    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
        })
        .state('index.settings', {
            url: "/settings",
            templateUrl: "views/settings.html",
            data: { pageTitle: 'Settings view' }
        })
        .state('index.dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard.html",
            data: { pageTitle: 'Dashboard view' }
        })
        .state('index.maintenance', {
            url: "/maintenance",
            templateUrl: "views/maintenance.html",
            data: { pageTitle: 'Maintenance view' }
        })
        .state('index.fuel', {
            url: "/fuel",
            templateUrl: "views/fuel.html",
            data: { pageTitle: 'Fuel view' }
        })
        .state('index.performance', {
            url: "/performance",
            templateUrl: "views/performance.html",
            data: { pageTitle: 'Performance view' }
        })
        .state('index.badges', {
            url: "/badges",
            templateUrl: "views/badges.html",
            data: { pageTitle: 'Badges view' }
        })
}
angular
    .module('app')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });