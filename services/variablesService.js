app.factory("variablesService", ['$http', "$location", "$rootScope", function($http, $location, $rootScope) {
    var alreadyDownloadLang=false;
    var supportedLang=["ita"];
    return {
      getVariables : function (lang){
        var url = 'https://blundert-backend.herokuapp.com/api/variables/'+lang+'?callback=JSON_CALLBACK';
              $http.jsonp(url)
              .success(function(data){
                $rootScope.variables = data[0];
                $rootScope.lang = lang;
              })
              .error(function(){
              })
              ;

      },
      checkUrl : function (lang){

        if(!alreadyDownloadLang) {
          var url = 'https://blundert-backend.herokuapp.com/api/supported-lang?callback=JSON_CALLBACK';
          $http.jsonp(url)
          .success(function(data){
              supportedLang=data;
              alreadyDownloadLang=true;
              if(supportedLang.indexOf(lang) == -1)
              {
                 $location.path("ita");
              }
          })
          .error(function(){
            console.log("Errore.");
          });
        }
      },

    }
}]);
