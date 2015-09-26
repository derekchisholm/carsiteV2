/**
 * INSPINIA - Responsive Admin Theme
 * 2.3
 *
 * Custom scripts
 */

$(document).ready(function () {


    // Full height
    function fix_height() {
        var heightWithoutNavbar = $("body > #wrapper").height() - 61;
        $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");

        var navbarHeigh = $('nav.navbar-default').height();
        var wrapperHeigh = $('#page-wrapper').height();

        if(navbarHeigh > wrapperHeigh){
            $('#page-wrapper').css("min-height", navbarHeigh + "px");
        }

        if(navbarHeigh < wrapperHeigh){
            $('#page-wrapper').css("min-height", $(window).height()  + "px");
        }

        if ($('body').hasClass('fixed-nav')) {
            $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
        }
    }

    $(window).bind("load resize scroll", function() {
        if(!$("body").hasClass('body-small')) {
            fix_height();
        }
    });

    setTimeout(function(){
        fix_height();
    })
});

// Minimalize menu when screen is less than 768px
$(function() {
    $(window).bind("load resize", function() {
        if ($(this).width() < 769) {
            $('body').addClass('body-small')
        } else {
            $('body').removeClass('body-small')
        }
    })
});

/**
 * INSPINIA - Responsive Admin Theme
 *
 */
(function () {
    angular.module('app', [
        'ui.router',                    // Routing
        'ui.bootstrap',                 // Bootstrap
        'ui.footable',
        'chart.js',
        'ncy-angular-breadcrumb',
        'datePicker',
        'angularMoment'
    ])
})();
/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written stat for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $breadcrumbProvider) {
    $urlRouterProvider.otherwise("/index/dashboard");
    $breadcrumbProvider.setOptions({
        prefixStateName: 'index.dashboard',
        includeAbstract: false
    });

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
        })
}
angular
    .module('app')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
/**
 * INSPINIA - Responsive Admin Theme
 *
 */


/**
 * pageTitle - Directive for set Page title - mata title
 */
function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = 'INSPINIA | Responsive Admin Theme';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) title = 'INSPINIA | ' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
};

/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
function sideNavigation($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function(){
                element.metisMenu();
            });
        }
    };
};

/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
function iboxTools($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            },
                // Function for close ibox
                $scope.closebox = function () {
                    var ibox = $element.closest('div.ibox');
                    ibox.remove();
                }
        }
    };
};

/**
 * minimalizaSidebar - Directive for minimalize sidebar
 */
function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    // Hide menu in order to smoothly turn on when maximize menu
                    $('#side-menu').hide();
                    // For smoothly turn on menu
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(500);
                        }, 100);
                } else if ($('body').hasClass('fixed-sidebar')){
                    $('#side-menu').hide();
                    setTimeout(
                        function () {
                            $('#side-menu').fadeIn(500);
                        }, 300);
                } else {
                    // Remove all inline style from jquery fadeIn function to reset menu state
                    $('#side-menu').removeAttr('style');
                }
            }
        }
    };
};

/**
 * iboxTools with full screen - Directive for iBox tools elements in right corner of ibox with full screen option
 */
function iboxToolsFullScreen($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox_tools_full_screen.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            };
            // Function for close ibox
            $scope.closebox = function () {
                var ibox = $element.closest('div.ibox');
                ibox.remove();
            };
            // Function for full screen
            $scope.fullscreen = function () {
                var ibox = $element.closest('div.ibox');
                var button = $element.find('i.fa-expand');
                $('body').toggleClass('fullscreen-ibox-mode');
                button.toggleClass('fa-expand').toggleClass('fa-compress');
                ibox.toggleClass('fullscreen');
                setTimeout(function() {
                    $(window).trigger('resize');
                }, 100);
            }
        }
    };
}

/**
 * footable complete - Directive for rendering footables after data has been populated already.
 */
function footableComplete(){
    return function(scope, element){
        var footableTable = element.parents('table');
        
        if( !scope.$last ) {
            return false;
        }
        
        scope.$evalAsync(function(){
            
            if (! footableTable.hasClass('footable-loaded')) {
                footableTable.footable();
            }
            
            footableTable.trigger('footable_initialized');
            footableTable.trigger('footable_resize');
            footableTable.data('footable').redraw();
        });
    };
}

/**
 * icheck - Directive for custom checkbox icheck
 */
function icheck($timeout) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function($scope, element, $attrs, ngModel) {
            return $timeout(function() {
                var value;
                value = $attrs['value'];

                $scope.$watch($attrs['ngModel'], function(newValue){
                    $(element).iCheck('update');
                })

                return $(element).iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green'

                }).on('ifChanged', function(event) {
                        if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                            $scope.$apply(function() {
                                return ngModel.$setViewValue(event.target.checked);
                            });
                        }
                        if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                            return $scope.$apply(function() {
                                return ngModel.$setViewValue(value);
                            });
                        }
                    });
            });
        }
    };
}

/**
 *
 * Pass all functions into module
 */
angular
    .module('app')
    .directive('pageTitle', pageTitle)
    .directive('sideNavigation', sideNavigation)
    .directive('iboxTools', iboxTools)
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive('iboxToolsFullScreen', iboxToolsFullScreen)
    .directive('footableComplete', footableComplete)
    .directive('icheck', icheck);

/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * DashboardCtrl - controller
 */
function DashboardCtrl() {

    this.userName = 'Example user';
    this.helloText = 'Welcome in SeedProject';
    this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';

};

function SettingsCtrl() {
    
};

function PricePerGalCtrl($scope, $http, $filter) {
    $http.get('data/fill-ups.json').
        then(function(data) {
            $scope.fillUps = data.data;
            
            $scope.labels = [];
            $scope.seriesA = [];
            $scope.dataSets = [];
            
            for (i = 0; i < $scope.fillUps.length; i++) {
                date = new Date($scope.fillUps[i].dateTime);
                date = $filter("date")(date, "shortDate");
                price = $scope.fillUps[i].price.toFixed(2);
                
                $scope.labels.push(date);
                $scope.seriesA.push(price);
            }
            
            $scope.dataSets.push($scope.seriesA);
            $scope.data = $scope.dataSets;
    });
}

function MilesPerGalCtrl($scope, $http, $filter) {
    $http.get('data/fill-ups.json').
        then(function(data) {
            $scope.fillUps = data.data;
            
            $scope.labels = [];
            $scope.seriesA = [];
            $scope.dataSets = [];
            
            for (i = 0; i < $scope.fillUps.length; i++) {
                date = new Date($scope.fillUps[i].dateTime);
                date = $filter("date")(date, "shortDate");
                
                distance = (i > 0) ? $scope.fillUps[i].odometer - $scope.fillUps[i - 1].odometer : 0;
                mpg = (i > 0) ? distance / $scope.fillUps[i].volume : 0;
                
                $scope.labels.push(date);
                $scope.seriesA.push(mpg.toFixed(1));
            }
            
            $scope.dataSets.push($scope.seriesA);
            $scope.data = $scope.dataSets;
    });
}

function FuelListCtrl($scope, $http, moment) {
    $http.get('data/fill-ups.json').
        then(function(data) {
            $scope.fillUps = data.data;
            
            for (i = 0; i < $scope.fillUps.length; i++) {
                price = $scope.fillUps[i].price.toFixed(2);
                volume = $scope.fillUps[i].volume.toFixed(2);
                cost = price * volume;
                $scope.fillUps[i].cost = cost.toFixed(2);
                $scope.fillUps[i].dateTime = moment($scope.fillUps[i].dateTime).format("M/d/YYYY");
            }
    });
};

function NewFillUpController($scope, $http) {
    $http.get('data/fill-ups.json').
        then(function(data) {
            $scope.fillUps = data.data;
            
            $scope.save = function() {
                $http.post('data/fill-ups.json', $scope.fillUps).
                    then(function(data) {
                        
                });
            };
    });
};

angular
    .module('app')
    .controller('DashboardCtrl', DashboardCtrl)
    .controller('SettingsCtrl', SettingsCtrl)
    .controller('FuelListCtrl', FuelListCtrl)
    .controller('PricePerGalCtrl', PricePerGalCtrl)
    .controller('MilesPerGalCtrl', MilesPerGalCtrl)
    .controller('NewFillUpController', NewFillUpController)