/**
 * matteogranzotto.com
 * @version v1.2.0 - 2016-06-20
 * @link http://www.matteogranzotto.com
 * @author Matteo Granzotto <granzotto.matteo@gmail.com> (http://matteogranzotto.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

app.controller('instagramController', ['$scope','$location','$routeParams', "variablesService", "instagram", function($scope, $location, $routeParams, variablesService, instagram) {
  variablesService.checkUrl($routeParams.lang);
  variablesService.getVariables($routeParams.lang);
  var instagram = instagram.create();
}]);
