/**
 * matteogranzotto.com
 * @version v1.2.0 - 2016-06-20
 * @link http://www.matteogranzotto.com
 * @author Matteo Granzotto <granzotto.matteo@gmail.com> (http://matteogranzotto.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

app.factory("homeService", ['$http', '$q',function($http, $q) {
    return {
      getImage : function (){
        var deferred= $q.defer();
        var url = 'http://www.matteogranzotto.com/images/me.jpg';
              $http.get(url)
              .then(function(data){
                  deferred.resolve(data);
              }, function(error){
                deferred.reject(error);
              });
            return deferred.promise;


      }
    }
}]);
