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
          $("#all").removeClass("active");
      };

    }
  };
});
