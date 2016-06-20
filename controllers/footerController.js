/**
 * matteogranzotto.com
 * @version v1.2.0 - 2016-06-20
 * @link http://www.matteogranzotto.com
 * @author Matteo Granzotto <granzotto.matteo@gmail.com> (http://matteogranzotto.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

app.controller('footerController', ['$scope','$http', '$routeParams',"footerService", function($scope, $http, $routeParams, footerService ) {
        footerService.getFooter(function(data){
          $scope.footerVariable = data[0];
          $scope.footerVariable.description[0].string= $scope.footerVariable.description[0].string.replace("##ANNO##", new Date().getFullYear());
        });


}]);
