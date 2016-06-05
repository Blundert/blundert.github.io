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
