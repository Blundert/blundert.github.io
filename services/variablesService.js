app.factory("variablesService", ['$http', "$location", "$rootScope", function($http, $location, $rootScope) {
    console.log("variablesService");
    var alreadyDownloadLang=false;
    var supportedLang=["ita"];
    return {
      getVariables : function (lang){
        console.log(lang);
        var url = 'https://blundert-backend.herokuapp.com/api/variables/'+lang+'?callback=JSON_CALLBACK';
        console.log(url);
              $http.jsonp(url)
              .success(function(data){
                console.log("2ntro");
                $rootScope.variables = data[0];
                $rootScope.lang = lang;
              })
              .error(function(){
                console.log("fdsfds");
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
              console.log(supportedLang);
              if(supportedLang.indexOf(lang) == -1)
              {
                 console.log(supportedLang.indexOf(lang));
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
