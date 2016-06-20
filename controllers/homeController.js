/**
 * matteogranzotto.com
 * @version v1.2.0 - 2016-06-20
 * @link http://www.matteogranzotto.com
 * @author Matteo Granzotto <granzotto.matteo@gmail.com> (http://matteogranzotto.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

app.controller('homeController', ['$scope','$rootScope','$location','$routeParams',"variablesService", "instagram", "logo","homeService",function($scope,$rootScope, $location, $routeParams, variablesService, instagram, logo, homeService) {
      variablesService.checkUrl($routeParams.lang);
      variablesService.getVariables($routeParams.lang);
      $scope.adjust= logo;
      $scope.insta = instagram;

        var wow = new WOW({
          boxClass: 'wow',
          mobile: true
        }).init();


        homeService.getImage()
        .then(data => {
          $rootScope.readyToShow=true;
          $scope.insta.create();
          $scope.adjust.adjust();
        }, function(error) {

        });

}]);
