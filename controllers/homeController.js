app.controller('homeController', ['$scope','$location','$routeParams',"variablesService", "copertina","instagram",function($scope, $location, $routeParams, variablesService, copertina, instagram) {
      variablesService.checkUrl($routeParams.lang);
      variablesService.getVariables($routeParams.lang);
      var adjust= copertina.adjust();
      var instagram = instagram.create();

}]);
