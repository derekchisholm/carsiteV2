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
