app.factory("logo", [ function() {

  return {

    adjust : function() {
      $(document).ready(function(){

          //setup
          resizeIt();

          //events
          $(window).resize(function() {
            resizeIt();
          });

        });
    }
  }

  function resizeIt() {
    if($(window).width()<570) {
      $(".center-my-face").css("max-width",$(window).width());
      $(".center-my-face").find("img").css("height",$(window).width());

    }
  }

}]);
