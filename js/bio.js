/**
 * matteogranzotto.com
 * @version v1.2.0 - 2016-06-20
 * @link http://www.matteogranzotto.com
 * @author Matteo Granzotto <granzotto.matteo@gmail.com> (http://matteogranzotto.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

//funzione ridimensionamento esatto immagini versione desktop
$(document).ready(function(){

    //setup
    ridimensiona();

    //events
    $(window).resize(function() {
      ridimensiona();
    });

});

//funzione ausiliare
function ridimensiona()
{
  $(".social").find("li").css("height",$('.contenitore-1280').width()*0.24);
}
