app.controller('bioController', ['$scope','$location','$routeParams',"generalInfoService","copertina", "variablesService", function($scope, $location, $routeParams, generalInfoService, copertina, variablesService) {
  variablesService.checkUrl($routeParams.lang);
  variablesService.getVariables($routeParams.lang);

  var adjust = copertina.adjust();

      var location = $location.path().replace($routeParams.lang, "");
      var type  = "big";
      if(location=="/") {
        type = "small";
      }



      generalInfoService.getBio($routeParams.lang,type, function(data) {
            var myBday = new Date(1993,08,28);
            var myAge = generalInfoService.calculateAge(myBday);
            $scope.bio=data;
            $scope.bio.description= $scope.bio.description.replace("##ETA##", myAge);
      });
}]);
