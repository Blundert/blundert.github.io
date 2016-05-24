app.factory("generalInfoService", ['$http', "$location", function($http, $location) {
    console.log("generalInfoService");
    return {
      getBio : function (lang,type, callback){
        console.log(lang+" "+type);
        var url = 'https://blundert-backend.herokuapp.com/api/general-info?callback=JSON_CALLBACK&lang='+lang+'&type='+type+'&what=bio';
        console.log(url);
              $http.jsonp(url)
              .success(function(data){
                console.log("2ntro");
                callback(data[0]);
              })
              .error(function(){
                console.log("fdsfds");
              })
              ;

      },
      calculateAge(birthday) { // birthday is a date
          var ageDifMs = Date.now() - birthday.getTime();
          var ageDate = new Date(ageDifMs); // miliseconds from epoch
          return Math.abs(ageDate.getUTCFullYear() - 1970);
      }
    }
}]);
