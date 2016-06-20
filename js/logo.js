/**
 * matteogranzotto.com
 * @version v1.2.0 - 2016-06-20
 * @link http://www.matteogranzotto.com
 * @author Matteo Granzotto <granzotto.matteo@gmail.com> (http://matteogranzotto.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

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
