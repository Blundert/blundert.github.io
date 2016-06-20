/**
 * matteogranzotto.com
 * @version v1.2.0 - 2016-06-20
 * @link http://www.matteogranzotto.com
 * @author Matteo Granzotto <granzotto.matteo@gmail.com> (http://matteogranzotto.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

app.factory("footerService", ['$http',function($http) {
    return {
      getFooter : function (callback){
        var url = 'https://blundert-backend.herokuapp.com/api/footer?callback=JSON_CALLBACK';
              $http.jsonp(url)
              .success(function(data){
                  callback(data);
              })
              .error(function(){
                console.log("Errore.");
              })
              ;

      }
    }
}]);
