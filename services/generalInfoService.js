/**
 * matteogranzotto.com
 * @version v1.2.0 - 2016-06-20
 * @link http://www.matteogranzotto.com
 * @author Matteo Granzotto <granzotto.matteo@gmail.com> (http://matteogranzotto.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

app.factory("generalInfoService", ['$http', "$location", function($http, $location) {
    return {
      getBio : function (lang,type, callback){
        var url = 'https://blundert-backend.herokuapp.com/api/general-info?callback=JSON_CALLBACK&lang='+lang+'&type='+type+'&what=bio';
              $http.jsonp(url)
              .success(function(data){
                callback(data[0]);
              })
              .error(function(){
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
