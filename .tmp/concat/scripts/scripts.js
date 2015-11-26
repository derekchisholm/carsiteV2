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

/*! iCheck v1.0.2 by Damir Sultanov, http://git.io/arlzeA, MIT Licensed */
(function(f){function A(a,b,d){var c=a[0],g=/er/.test(d)?_indeterminate:/bl/.test(d)?n:k,e=d==_update?{checked:c[k],disabled:c[n],indeterminate:"true"==a.attr(_indeterminate)||"false"==a.attr(_determinate)}:c[g];if(/^(ch|di|in)/.test(d)&&!e)x(a,g);else if(/^(un|en|de)/.test(d)&&e)q(a,g);else if(d==_update)for(var f in e)e[f]?x(a,f,!0):q(a,f,!0);else if(!b||"toggle"==d){if(!b)a[_callback]("ifClicked");e?c[_type]!==r&&q(a,g):x(a,g)}}function x(a,b,d){var c=a[0],g=a.parent(),e=b==k,u=b==_indeterminate,
    v=b==n,s=u?_determinate:e?y:"enabled",F=l(a,s+t(c[_type])),B=l(a,b+t(c[_type]));if(!0!==c[b]){if(!d&&b==k&&c[_type]==r&&c.name){var w=a.closest("form"),p='input[name="'+c.name+'"]',p=w.length?w.find(p):f(p);p.each(function(){this!==c&&f(this).data(m)&&q(f(this),b)})}u?(c[b]=!0,c[k]&&q(a,k,"force")):(d||(c[b]=!0),e&&c[_indeterminate]&&q(a,_indeterminate,!1));D(a,e,b,d)}c[n]&&l(a,_cursor,!0)&&g.find("."+C).css(_cursor,"default");g[_add](B||l(a,b)||"");g.attr("role")&&!u&&g.attr("aria-"+(v?n:k),"true");
    g[_remove](F||l(a,s)||"")}function q(a,b,d){var c=a[0],g=a.parent(),e=b==k,f=b==_indeterminate,m=b==n,s=f?_determinate:e?y:"enabled",q=l(a,s+t(c[_type])),r=l(a,b+t(c[_type]));if(!1!==c[b]){if(f||!d||"force"==d)c[b]=!1;D(a,e,s,d)}!c[n]&&l(a,_cursor,!0)&&g.find("."+C).css(_cursor,"pointer");g[_remove](r||l(a,b)||"");g.attr("role")&&!f&&g.attr("aria-"+(m?n:k),"false");g[_add](q||l(a,s)||"")}function E(a,b){if(a.data(m)){a.parent().html(a.attr("style",a.data(m).s||""));if(b)a[_callback](b);a.off(".i").unwrap();
    f(_label+'[for="'+a[0].id+'"]').add(a.closest(_label)).off(".i")}}function l(a,b,f){if(a.data(m))return a.data(m).o[b+(f?"":"Class")]}function t(a){return a.charAt(0).toUpperCase()+a.slice(1)}function D(a,b,f,c){if(!c){if(b)a[_callback]("ifToggled");a[_callback]("ifChanged")[_callback]("if"+t(f))}}var m="iCheck",C=m+"-helper",r="radio",k="checked",y="un"+k,n="disabled";_determinate="determinate";_indeterminate="in"+_determinate;_update="update";_type="type";_click="click";_touch="touchbegin.i touchend.i";
    _add="addClass";_remove="removeClass";_callback="trigger";_label="label";_cursor="cursor";_mobile=/ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);f.fn[m]=function(a,b){var d='input[type="checkbox"], input[type="'+r+'"]',c=f(),g=function(a){a.each(function(){var a=f(this);c=a.is(d)?c.add(a):c.add(a.find(d))})};if(/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(a))return a=a.toLowerCase(),g(this),c.each(function(){var c=
        f(this);"destroy"==a?E(c,"ifDestroyed"):A(c,!0,a);f.isFunction(b)&&b()});if("object"!=typeof a&&a)return this;var e=f.extend({checkedClass:k,disabledClass:n,indeterminateClass:_indeterminate,labelHover:!0},a),l=e.handle,v=e.hoverClass||"hover",s=e.focusClass||"focus",t=e.activeClass||"active",B=!!e.labelHover,w=e.labelHoverClass||"hover",p=(""+e.increaseArea).replace("%","")|0;if("checkbox"==l||l==r)d='input[type="'+l+'"]';-50>p&&(p=-50);g(this);return c.each(function(){var a=f(this);E(a);var c=this,
        b=c.id,g=-p+"%",d=100+2*p+"%",d={position:"absolute",top:g,left:g,display:"block",width:d,height:d,margin:0,padding:0,background:"#fff",border:0,opacity:0},g=_mobile?{position:"absolute",visibility:"hidden"}:p?d:{position:"absolute",opacity:0},l="checkbox"==c[_type]?e.checkboxClass||"icheckbox":e.radioClass||"i"+r,z=f(_label+'[for="'+b+'"]').add(a.closest(_label)),u=!!e.aria,y=m+"-"+Math.random().toString(36).substr(2,6),h='<div class="'+l+'" '+(u?'role="'+c[_type]+'" ':"");u&&z.each(function(){h+=
        'aria-labelledby="';this.id?h+=this.id:(this.id=y,h+=y);h+='"'});h=a.wrap(h+"/>")[_callback]("ifCreated").parent().append(e.insert);d=f('<ins class="'+C+'"/>').css(d).appendTo(h);a.data(m,{o:e,s:a.attr("style")}).css(g);e.inheritClass&&h[_add](c.className||"");e.inheritID&&b&&h.attr("id",m+"-"+b);"static"==h.css("position")&&h.css("position","relative");A(a,!0,_update);if(z.length)z.on(_click+".i mouseover.i mouseout.i "+_touch,function(b){var d=b[_type],e=f(this);if(!c[n]){if(d==_click){if(f(b.target).is("a"))return;
        A(a,!1,!0)}else B&&(/ut|nd/.test(d)?(h[_remove](v),e[_remove](w)):(h[_add](v),e[_add](w)));if(_mobile)b.stopPropagation();else return!1}});a.on(_click+".i focus.i blur.i keyup.i keydown.i keypress.i",function(b){var d=b[_type];b=b.keyCode;if(d==_click)return!1;if("keydown"==d&&32==b)return c[_type]==r&&c[k]||(c[k]?q(a,k):x(a,k)),!1;if("keyup"==d&&c[_type]==r)!c[k]&&x(a,k);else if(/us|ur/.test(d))h["blur"==d?_remove:_add](s)});d.on(_click+" mousedown mouseup mouseover mouseout "+_touch,function(b){var d=
        b[_type],e=/wn|up/.test(d)?t:v;if(!c[n]){if(d==_click)A(a,!1,!0);else{if(/wn|er|in/.test(d))h[_add](e);else h[_remove](e+" "+t);if(z.length&&B&&e==v)z[/ut|nd/.test(d)?_remove:_add](w)}if(_mobile)b.stopPropagation();else return!1}})})}})(window.jQuery||window.Zepto);

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
        'angularMoment'
    ]);
})();

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

(function () {
    'use strict';
    
    angular
        .module('app')
        .directive('footableComplete', footableComplete);

    footableComplete.$inject = [];

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
})();

(function () {
    'use strict';
    
    angular
        .module('app')
        .directive('iboxTools', iboxTools);

    iboxTools.$inject = ['$timeout'];

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
                };
                // Function for close ibox
                $scope.closebox = function () {
                    var ibox = $element.closest('div.ibox');
                    ibox.remove();
                };
            }
        };
    }
})();

(function () {
    'use strict';
    
    angular
        .module('app')
        .directive('iboxToolsFullScreen', iboxToolsFullScreen);

    iboxToolsFullScreen.$inject = ['$timeout'];

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
                };
            }
        };
    }
})();

(function () {
    'use strict';
    
    angular
        .module('app')
        .directive('icheck', icheck);

    icheck.$inject = ['$timeout'];

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
                    });

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
})();

(function () {
    'use strict';
    
    angular
        .module('app')
        .directive('minimalizaSidebar', minimalizaSidebar);

    minimalizaSidebar.$inject = ['$timeout'];

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
                };
            }
        };
    }
})();

(function () {
    'use strict';
    
    angular
        .module('app')
        .directive('pageTitle', pageTitle);

    pageTitle.$inject = ['$rootScope', '$timeout'];

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
        };
    }
})();

(function () {
    'use strict';
    
    angular
        .module('app')
        .directive('sideNavigation', sideNavigation);

    sideNavigation.$inject = ['$timeout'];

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
    }
})();

(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = [];

    function DashboardController() {
        var vm = this;
        
        vm.userName = 'Example user';
        vm.helloText = 'Welcome in SeedProject';
        vm.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';
    }
})();

(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('FuelListController', FuelListController);

    FuelListController.$inject = ['$http', 'moment'];

function FuelListController($http, moment) {
        var vm = this;
        
        $http.get('http://api.carsite.local/fillups').
            then(function(data) {
                vm.fillUps = data.data._embedded.fillups;
                
                var i = 0;

                for (i = 0; i < vm.fillUps.length; i++) {
                    vm.fillUps[i].price = parseFloat(vm.fillUps[i].price).toFixed(2);
                    vm.fillUps[i].volume = parseFloat(vm.fillUps[i].volume).toFixed(2);
                    vm.fillUps[i].date = moment(vm.fillUps[i].date).format('l');
                }
        });
    }
})();
    
(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('NewFillUpController', NewFillUpController);

    NewFillUpController.$inject = ['$http', '$location'];

    function NewFillUpController($http, $location) {
        var vm = this;
        
        vm.create = create;
        vm.cancel = cancel;
        vm.calcCost = calcCost;
        
        vm.formData = {};

        function create() {
            vm.formData.date = vm.formData.date.toLocaleString();
            
            $http.post('http://api.carsite.local/fillups', vm.formData).
                then(function(data, status, headers) {
                    $location.path('/fuel/vehicle');
            }, function (data) {
                    alert(data.data.detail);
            });
        };

        function cancel() {
            $location.path('/fuel/vehicle');
        };

        function calcCost() {
            var price;
            var volume;
            var cost;
            
            if (vm.formData.price > 0 && vm.formData.volume > 0) {
                price = parseFloat(vm.formData.price).toFixed(2);
                volume = parseFloat(vm.formData.volume).toFixed(2);
                cost = price * volume;
                vm.formData.cost = cost.toFixed(2);
            }
        };
    }
})();

(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('PricePerGalController', PricePerGalController);

    PricePerGalController.$inject = ['$http', '$filter'];

    function PricePerGalController($http, $filter) {
        var vm = this;
        
        $http.get('http://api.carsite.local/fillups').
            then(function(data) {
                vm.fillUps = data.data._embedded.fillups;

                vm.labels = [];
                vm.seriesA = [];
                vm.dataSets = [];
                
                var i = 0;
                var date = new Date();
                var price;
                
                for (i = 0; i < vm.fillUps.length; i++) {
                    date = new Date(vm.fillUps[i].date);
                    date = $filter("date")(date, "shortDate");
                    price = parseFloat(vm.fillUps[i].price);

                    vm.labels.push(date);
                    vm.seriesA.push(price.toFixed(3));
                }

                vm.dataSets.push(vm.seriesA);
                vm.data = vm.dataSets;
        });
    }
})();

(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('MilesPerGalController', MilesPerGalController);

    MilesPerGalController.$inject = ['$http'];

    function MilesPerGalController($http) {
        var vm = this;
        
        $http.get('http://api.carsite.local/fillups').
            then(function(data) {
                vm.fillUps = data.data._embedded.fillups;

                vm.labels = [];
                vm.seriesA = [];
                vm.dataSets = [];
                
                var i = 0;
                var date = new Date;
                var distance;
                var mpg;

                for (i = 0; i < vm.fillUps.length; i++) {
                    date = new Date(vm.fillUps[i].date);
                    date = moment(date).format('l');

                    distance = (i > 0) ? vm.fillUps[i].odometer - vm.fillUps[i - 1].odometer : 0;
                    mpg = (i > 0) ? distance / vm.fillUps[i].volume : 0;

                    vm.labels.push(date);
                    vm.seriesA.push(mpg.toFixed(1));
                }

                vm.dataSets.push(vm.seriesA);
                vm.data = vm.dataSets;
        });
    }
})();

(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('ServiceListController', ServiceListController);
    
    ServiceListController.$inject = ['$http'];
    
    function ServiceListController($http) {
        var vm = this;
        
        $http.get('http://api.carsite.local/service').
            then(function(data) {
                vm.service = data.data._embedded.service;
        });
    }
    
})();

(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = [];

    function SettingsController() {
    }   
})();
