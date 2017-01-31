'use strict';

/**
 * @ngdoc overview
 * @name blundert
 */

/**
 * @ngdoc controller
 * @name blundert:LoadingController
 * @this
 * @property {string} Name
 * Name of the controller.
 */

// This function implements the controller
var LoadingController =
    function (
    ) {
        // Public varaibles
        var name = "Loading";

        // exports
        angular.extend(this, {
            name : name
        });

    };

// Dependency injection
LoadingController.$inject = [ ];

angular
    .module('blundert')
    .component('loadingComponent',  {
        templateUrl: 'app/components/loading/loading.html',
        controller: LoadingController
    });