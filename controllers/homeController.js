app.controller('homeController', ['$scope','$location','$routeParams',"variablesService", "instagram", "logo",function($scope, $location, $routeParams, variablesService, instagram, logo) {
      variablesService.checkUrl($routeParams.lang);
      variablesService.getVariables($routeParams.lang);
      var adjust= logo.adjust();
      var instagram = instagram.create();
      var $yeti = $('.center-my-face');
      MotionUI.animateIn($yeti, "scale-in-up");
}]);
