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
