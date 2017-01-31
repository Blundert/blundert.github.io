'use strict';

/**
 * @ngdoc overview
 * @name blundert
 */

/**
 * @ngdoc controller
 * @name blundert:homeController
 * @this
 * @requires
 * $rootScope
 * @requires
 * $timeout
 * @property {string} Name
 * Name of the controller.
 */

var HomeController =
  function (
    HomeService,
    $rootScope
  ) {
    // Variables 
    this.name = name;

    // Init operation 
    HomeService
      .getImage()
      .then(function(data) {
        $rootScope.$emit('showSpinner', {value: true});
      });

    // exports
    angular.extend(this, {
      name: name
    });

  };

// Dependency injection
HomeController.$inject = [
  "HomeService",
  "$rootScope"
];

angular
    .module('blundert')
    .component('homeComponent',  {
        templateUrl: 'app/components/home/home.html',
        controller: HomeController
    });