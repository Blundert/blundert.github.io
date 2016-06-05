//varaibles globali
var xml;
var valArr = new Array();
var f_exec = true;
var flag=true;


//#############################################################################

$(document).ready(function(){

    $.ajax({
      url: "xml/progetti.xml",
      dataType: "xml",
      success: function(xmlFile){
        xml = xmlFile;
        elaboroProgettiXML(xml,0,2);
        }
    });
});

//#############################################################################
//variables
var margineTop=65;

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
  if($('.riferimento').height()>600-margineTop)
  {
    $(".fullscreen").css("height",$('.riferimento').height()-margineTop);
    if($('#wrapper').find('.img-fullscreen').length)
    {
      $(".img-fullscreen").css("height",($('.riferimento').height()-margineTop)*0.8);
    }
  }
  else {
    $(".fullscreen").css("height",600-margineTop);
    if($('#wrapper').find('.img-fullscreen').length)
    {
      $(".img-fullscreen").css("height",($('.riferimento').height()-margineTop)*0.8);
    }
  }

  if($('#wrapper').find('.img-fullscreen').length)
  {
    $(".img-fullscreen").css("height",($('.riferimento').width()-margineTop)*0.8);
  }

}

//#############################################################################

// caricamento altre funzioni
$(document).ready(function(){
  $(window).scroll(function() {
     if($("html").height()-$(window).scrollTop() - $(".riferimento").height() < $("footer").height() && flag==true) {
       var ultimo = $(".feed").last().attr("id");
       flag=false;
       elaboroProgettiXML(xml,parseInt(ultimo),3);
     }
  });
  $(window).resize(function() {
    eventiTesto();
  });

});

//##############################################################################
//elaboro xml
function elaboroProgettiXML(xmlFile,first,quanti){
  var cont = 0;
  var xml = xmlFile;
  $(xml).find('progetto').each(function () {
    if(cont<=(first+quanti) && cont>=first)
    {

        var text='<div class="details"><span class="titoloProgetto">'
        +$(this).find("nome").text()+
        '</span><a class="linkProgetto" href="'+$(this).find("link").text()+'">'+
        $(this).find("link").text()+
        '<a/></div>';

        if($(this).find("foto").length)
        {
          $('<div class="feed item" id="' + (cont+1) + '">'+text+
            '<img src="' + $(this).find("foto").text() + '" class="immagine" /></div>').appendTo('.pics');
        }
        if($(this).find("video").length)
        {
          var video = $(this).find("video").text().replace("watch?v=", "embed/");
          $('<div class="feed item" id="' + (cont+1) + '">'+text+
            '<iframe width="100%" height="500px" src="'+video+'" frameborder="0" allowfullscreen></iframe></div>').appendTo('.pics');
        }




    }
    cont++;
  });
  flag=true;

  //setup
  eventiTesto();



  $("img").click(function() {
    var imgUrl=$(this).parent().find("img").attr("src");
    var testo=$(this).parent().find(".details").text();
    if($('#wrapper').find('.fullscreen').length)
    {
        $('#wrapper').find('.fullscreen').remove();
    }
    $("#wrapper").append(
      $("<div/>",{class:"fullscreen"}).append(
        $("<div/>",{class:"chiudi"}).append($("<span/>")),
        $("<img/>",{class:"img-fullscreen",src:imgUrl,style:"height:"+($('.riferimento').width()-margineTop)*0.8+"px"}))

    );

    $(".chiudi").click(function() {
      $(".fullscreen").remove();
    });

  });

}

function eventiTesto()
{
  if($(".riferimento").width()>720 && !Modernizr.touch) //più di 720 px e non touch
  {
    $(".item").each(function(){
      $(this).find(".details").css("top","-5.5em");
      $(this).find("img").css("opacity",".7");
      $(this).find(".titoloProgetto").css("font-size","2em");
      $(this).find(".details").find("a").css("font-size","1em");
      $(this).find("img").css("margin-top","0em");
      /*Auto resize del font del titolo del progetto*/

      if($(this).find(".titoloProgetto").height()>$(this).find(".details").height()+20) // se è troppo grande ridimensiono
      {
        var rapporto=$(this).find(".titoloProgetto").height()/$(this).find(".details").height();
        rapporto=arrotonda(rapporto,0);
        $(this).find(".titoloProgetto").css("font-size",$(this).find(".details").height()/rapporto);
      }


      /*Fine*/

    });
    $(".feed.item").mouseenter(function() {
      $(this).find(".details").css("top","0px");
      $(this).find("img").css("opacity","1");
    });
    $(".feed.item").mouseleave(function() {
      $(this).find(".details").css("top","-5.5em");
      $(this).find("img").css("opacity",".7");

    });
  }
  else { //touch o più piccolo di di 720 o touch e più piccolo di 720
    $(".item").each(function(){
      $(this).find(".details").css("top","0px");
      $(this).find(".titoloProgetto").css("font-size","1.1em");
      $(this).find(".titoloProgetto").css("display","block");
      $(this).find(".details").find("a").css("font-size","1.1em");
      $(this).find("iframe").css("margin-top","5em");
      $(this).find("img").css("margin-top","5em");
      $(this).find("img").css("opacity","1");
    });
    $(".feed.item").off("mouseenter");
    $(".feed.item").off("mouseleave");
  }
}

function arrotonda(valore, nCifre)
{
  if(isNaN(parseFloat(valore)) || isNaN(parseInt(nCifre)) )
    return false;
  else
    return Math.round(valore * Math.pow(10,nCifre)) / Math.pow(10,nCifre);
}
