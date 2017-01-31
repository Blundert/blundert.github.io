'use strict';

/**
 * @ngdoc overview
 * @name blundert
 */

/**
 * @ngdoc controller
 * @name blundert.main:MainController
 * @this
 * @requires
 * $rootScope
 * @requires
 * $timeout
 * @property {string} Name
 * Name of the controller.
 */

// This function implements the controller
var MainController =
    function (
        $rootScope,
        $timeout
    ) {
        // Public varaibles
        var name = "Main";
        var controller = this;
        this.prova = true;

        // Init operation
        this.allLoaded = false;
        var showSpinnerEvent = $rootScope.$on("showSpinner", function(event, arg) {
          $timeout(function() {
            if (arg.hasOwnProperty('value')) {
              $timeout(function() {
                controller.allLoaded = arg.value;
              }, 1000);
            }
          });
        });
        $rootScope.$on('$destroy', showSpinnerEvent);

        // exports
        angular.extend(this, {
            name : name
        });

    };

// Dependency injection
MainController.$inject = [
    "$rootScope",
    "$timeout"
];

angular
    .module('blundert')
    .component('mainComponent',  {
        templateUrl: 'app/components/main/main.html',
        controller: MainController
    });
