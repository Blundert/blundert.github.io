app.controller('instagramController', ['$scope','$location','$routeParams', "variablesService", "instagram", function($scope, $location, $routeParams, variablesService, instagram) {
  variablesService.checkUrl($routeParams.lang);
  variablesService.getVariables($routeParams.lang);
  var instagram = instagram.create();
}]);
