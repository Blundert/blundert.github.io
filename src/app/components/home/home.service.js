'use strict';

/**
 * @ngdoc overview
 * @name blundert
 */

/**
 * @ngdoc service
 * @name blundert:LandingPageService
 * @this
 * @requires
 * $q
 * @description
 *
 * @version v1.2.0 - 2016-06-20
 * @link http://www.matteogranzotto.com
 * @author Matteo Granzotto <granzotto.matteo@gmail.com> (http://matteogranzotto.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

// This function implements the service.
var HomeService =
    function (
        $http,
        $q,
        serverUtils
    ) {
        // Variables
        var name = "Home Service";

        // public
        function getImage() {
          var deferred= $q.defer();
          var url = '/assets/images/me.jpg';
          $http
            .get(url)
            .then(
              function(data){
                deferred.resolve(data);
              }, 
              function(error) {
                deferred.reject(error);
              }
            );
          return deferred.promise;
        }

        // exports
        angular.extend(this, {
            name : name,
            getImage : getImage
        });

    };

// Dependency injection
HomeService.$inject = [
    "$http",
    "$q",
    "serverUtils"
];

angular
  .module("blundert")
  .service('HomeService', HomeService);
