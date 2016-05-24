app.controller('footerController', ['$scope','$http', '$routeParams',"footerService", function($scope, $http, $routeParams, footerService ) {
        footerService.getFooter(function(data){
          $scope.footerVariable = data[0];
          $scope.footerVariable.description[0].string= $scope.footerVariable.description[0].string.replace("##ANNO##", new Date().getFullYear());
        });


}]);
