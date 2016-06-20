/**
 * matteogranzotto.com
 * @version v1.2.0 - 2016-06-20
 * @link http://www.matteogranzotto.com
 * @author Matteo Granzotto <granzotto.matteo@gmail.com> (http://matteogranzotto.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

app.directive('headerDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/headerDirective.html',
    link: function(scope, element, attribute){
      $("#bottone-menu").click(function(){
          if($("#all").hasClass("active"))
          {
              $("#all").removeClass("active");
          }
          else
          {
              $("#all").addClass("active");
          }
          return false;

      });

      scope.goUp= function() {
        setTimeout(function(){
          $("#all").removeClass("active");
        },500);
      };

    }
  };
});
