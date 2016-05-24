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
