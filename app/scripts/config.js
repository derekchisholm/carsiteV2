(function () {
    'use strict';
    
    angular
        .module('app')
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$breadcrumbProvider', '$httpProvider', 'authProvider', 'jwtInterceptorProvider'];
    run.$inject = ['$rootScope', '$state', 'auth', 'store', 'jwtHelper', '$location'];
    
    function config($stateProvider, $urlRouterProvider, $breadcrumbProvider, $httpProvider, authProvider, jwtInterceptorProvider) {
        authProvider.init({
            domain: 'carsite.auth0.com',
            clientID: 'vY05hK8NooyrP3s2aNG05X3c2UbaAwNW',
            callbackUrl: location.href,
            loginState: 'login'
        });
        
        authProvider.on('loginSuccess', function($location, profilePromise, idToken, store) {
            console.log("Login Success");
            profilePromise.then(function(profile) {
                store.set('profile', profile);
                store.set('token', idToken);
            });
            $location.path('/');
        });

        authProvider.on('loginFailure', function() {
            alert("Error");
        });

        authProvider.on('authenticated', function($location) {
            console.log("Authenticated");
        });

        authProvider.on('logout', function() {
            console.log("Logged out");
        });
        
        $urlRouterProvider.otherwise("/index/dashboard");
        $breadcrumbProvider.setOptions({
            prefixStateName: 'index.dashboard',
            includeAbstract: false
        });

        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        //$httpProvider.defaults.headers.common["Accept"] = "application/json";
        //$httpProvider.defaults.headers.common["Content-Type"] = "application/json";

        $stateProvider

            .state('index', {
                abstract: true,
                url: "/index",
                templateUrl: "views/common/content.html",
                data: { requiresLogin: true }
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
                templateUrl: "views/common/content.html",
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
                data: { 
                    pageTitle: 'New fuel record'                    
                },
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
            })
            .state('register', {
                url: "/register",
                templateUrl: "views/register.html",
                data: { pageTitle: 'Register' }
            })
            .state('login', {
                url: "/login",
                templateUrl: "views/login.html",
                data: { pageTitle: 'Login' }
            });
    
        jwtInterceptorProvider.tokenGetter = function (store) {
            return store.get('token');
        };

        //jwtInterceptorProvider.tokenGetter = ['config', function (config) {
        //    // Skip authentication for any requests ending in .html
        //    if (config.url.substr(config.url.length - 5) == '.html') {
        //        return null;
        //    }
        //
        //    return store.get('token');
        //}];
        
        // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
        // NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
        // want to check the delegation-token example
        $httpProvider.interceptors.push('jwtInterceptor');
    }
    
    function run($rootScope, $state, auth, store, jwtHelper, $location) {
        $rootScope.$state = $state;
        auth.hookEvents();
        
        $rootScope.$on('$locationChangeStart', function() {
            var token = store.get('token');
            if (token) {
                if (!jwtHelper.isTokenExpired(token)) {
                    if (!auth.isAuthenticated) {
                        auth.authenticate(store.get('profile'), token);
                    }
                } else {
                    // Either show the login page or use the refresh token to get a new idToken
                    $location.path('/');
                }
            }
        });
    }
})();
