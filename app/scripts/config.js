(function () {
    'use strict';
    
    angular
        .module('app')
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$breadcrumbProvider', '$httpProvider'];
    run.$inject = ['$rootScope', '$state'];
    
    function config($stateProvider, $urlRouterProvider, $breadcrumbProvider, $httpProvider) {
        $urlRouterProvider.otherwise("/index/dashboard");
        $breadcrumbProvider.setOptions({
            prefixStateName: 'index.dashboard',
            includeAbstract: false
        });

        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.common["Accept"] = "application/json";
        $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

        $stateProvider

            .state('index', {
                abstract: true,
                url: "/index",
                templateUrl: "views/common/content.html",
            })
            .state('index.dashboard', {
                url: "/dashboard",
                templateUrl: "views/dashboard.html",
                data: { pageTitle: 'Dashboard view' },
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('fuel', {
                abstract: true,
                url: "/fuel",
                templateUrl: "views/common/content.html"
            })
            .state('fuel.dashboard', {
                url: "/vehicle",
                templateUrl: "/views/dashboard.fuel.html",
                data: { pageTitle: 'Fuel Dashboard' },
                ncyBreadcrumb: {
                    label: 'Fuel',
                    parent: 'fuel'
                }
            })
            .state('fuel.new', {
                url: "/new",
                templateUrl: "/views/fuel.new.html",
                data: { pageTitle: 'New fuel record' },
                ncyBreadcrumb: {
                    label: 'New Record',
                    parent: 'fuel.dashboard'
                }
            })
            .state('index.maintenance', {
                url: "/maintenance",
                templateUrl: "views/dashboard.maintenance.html",
                data: { pageTitle: 'Maintenance view' }
            })        
            .state('index.performance', {
                url: "/performance",
                templateUrl: "views/dashboard.performance.html",
                data: { pageTitle: 'Performance view' }
            })
            .state('index.badges', {
                url: "/badges",
                templateUrl: "views/badges.html",
                data: { pageTitle: 'Badges view' }
            })
            .state('settings', {
                abstract: true,
                url: "/settings",
                templateUrl: "views/common/content.html"
            })
            .state('settings.main', {
                url: "",
                templateUrl: "views/settings.html",
                ncyBreadcrumb: {
                    label: 'Settings',
                    parent: 'index'
                },
                data: { pageTitle: 'Settings' }
            })
            .state('settings.profile', {
                url: "/profile",
                templateUrl: "views/settings.profile.html",
                ncyBreadcrumb: {
                    label: 'Profile',
                    parent: 'settings.main'
                },
                data: { pageTitle: 'Profile' }
            })
            .state('settings.password', {
                url: "/password",
                templateUrl: "views/settings.password.html",
                data: { pageTitle: 'Password' }
            })
            .state('settings.notifications', {
                url: "/notifications",
                templateUrl: "views/settings.notifications.html",
                data: { pageTitle: 'Notifications' }
            })
            .state('settings.language', {
                url: "/language",
                templateUrl: "views/settings.language.html",
                data: { pageTitle: 'Language' }
            });
    }
    
    function run($rootScope, $state) {
        $rootScope.$state = $state;
    }
})();
