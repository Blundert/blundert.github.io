app.controller('homeController', ['$scope','$rootScope','$location','$routeParams',"variablesService", "instagram", "logo","homeService",function($scope,$rootScope, $location, $routeParams, variablesService, instagram, logo, homeService) {
      variablesService.checkUrl($routeParams.lang);
      variablesService.getVariables($routeParams.lang);
      var adjust= logo.adjust();
      $scope.insta = instagram;

        //var $yeti = $('.center-my-face');
        //MotionUI.animateIn($yeti, "scale-in-up");
        var wow = new WOW({
          boxClass: 'wow',
          mobile: true
        }).init();


        homeService.getImage()
        .then(data => {
          $rootScope.readyToShow=true;
          $scope.insta.create();
        }, function(error) {

        });

}]);
