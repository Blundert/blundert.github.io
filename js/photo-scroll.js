/**
 * matteogranzotto.com
 * @version v1.2.0 - 2016-06-20
 * @link http://www.matteogranzotto.com
 * @author Matteo Granzotto <granzotto.matteo@gmail.com> (http://matteogranzotto.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

app.factory("instagram", [ function() {

  return {

    create : function() {

      //varaibles globali
      var insta;
      var valArr = new Array();
      var f_exec = true;
      var flag=true; //previene durante lo scroll, altro scroll
      var last_id=null;
      var margineTop=65;
      var high;
      var stopLoad=false;
      //#############################################################################

      $(document).ready(function(){

        high=($(".pics").width())/quantoQ();
        ajaxCallForIstagram();

        //setup
        ridimensiona(); //funzione ridimensionamento esatto immagini versione desktop
        $(".pics").height($(window).height()-($("header").height()+32));

        //events
        $(window).resize(function() {
          ridimensiona();
        });

        if(quantiRiquadri()==16)
        {
          $(window).scroll(function() {
             // Raggiunto un certo scroll,dopo aver completato il caricamento di quello scrool, se c'e' ancora qualcosa da aggiungere, e se è stato scaricata la prima fase di foto
             if($("html").height()-$(window).scrollTop() - $(".riferimento").height() < $("footer").height() &&
                flag==true &&
                stopLoad==false &&
                !$(".primoLoading").length
               ) {
               $("<img/>",{class:"loading",src:"images/utily/loader.gif",alt:"Caricamento in corso.."}).appendTo(".pics");
               var ultimo = $(".feed").last().attr("id");
               flag=false;
               ajaxCallForIstagram(ultimo);
             }
          });
        }
        $(window).resize(function() {
          eventiTesto();
        });

      });

      //#############################################################################
      // funzione per determinare quanto dividere la larghezza (in pratica quante sono le colonne)
      function quantoQ() {
        var quanto=0;
        if($(window).width()>720)
        {
          quanto=4;
        }
        else {
          if ($(window).width()>480) {
            quanto=2;
          }
          else {
              quanto=1;
          }
        }
        return quanto;
      }

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

        high=($(".pics").width())/quantoQ();
        $(".item.feed").each(function(){
            $(this).height(high);
        });

      }

      //##############################################################################

      function ajaxCallForIstagram()
      {
        $.ajax({ url: "https://blundert-backend.herokuapp.com/api/instagram?max_id="+last_id,
          type: 'POST',
          contentType: "application/json",
          crossDomain:true,
          dataType: 'jsonp',
          success: function(instagramJson){
          insta=instagramJson;

          elaboroInstagramJSON(JSON.parse(insta),quantiRiquadri());
          },
          error: function(){
              console.log("Si è verificato un errore nel caricamento dei dati.. Prova a ricaricare la pagina :)");
          }
        });
      }

      //##############################################################################
      //elaboro json instagram
      function elaboroInstagramJSON(insta,quanti){
        $(".loading").remove();
        $(".pics").height("auto");
        var cont = 0;
        for (var key in insta.data) {
          if(cont>=parseInt(quanti))
          {
            stopLoad=false;
            break;
          }
          else {
            stopLoad=true;
          }
          if (insta.data.hasOwnProperty(key)) {
            var text="";
            if(insta.data[key].caption)
              text='<div class="details">'+insta.data[key].caption.text+'</div>'

            var img=new Image();
            img.src=insta.data[key].images.standard_resolution.url;
            if(quanti==16)
            {
              $('<div class="feed item" id="' + (cont+1) + '">' +
                '<img src="' + insta.data[key].images.standard_resolution.url + '" class="immagine" " />'+text+'</div>').appendTo('.pics');
              $(img).load(function (){
                $(".item").find("[src='"+this.src+"' ]").parent().css({"background-image":"none"});
                $(this).parent().css({"background-color":"red"});
              });

            }
            if(quanti==8)
            {
              $('<div class="feed item" id="' + (cont+1) + '">' +
                '<a href="/it/instagram"><img src="' + insta.data[key].images.standard_resolution.url + '" class="immagine" /></a>'+text+'</div>').appendTo('.pics');
              $(img).load(function (){
                $(".item").find("[src='"+this.src+"' ]").parent().parent().css({"background-image":"none"});
                $(this).parent().css({"background-color":"red"});
              });
            }


            $("#"+parseInt(cont+1)).height(high);
            last_id=insta.data[key].id;

          }
          cont++;
        }
        flag=true;

        //setup
        eventiTesto();



        $(".feed.item").click(function() {
          var imgUrl=$(this).find("img").attr("src");
          var testo=$(this).find(".details").text();
          if($('#wrapper').find('.fullscreen').length)
          {
              $('#wrapper').find('.fullscreen').remove();
          }
          if(quantiRiquadri()==16)
          {
            $("#wrapper").append(
              $("<div/>",{class:"fullscreen"}).append(
                $("<div/>",{class:"chiudi"}).append($("<span/>")),
                $("<a/>",{href:"https://instagram.com/blunderttt/"}).append($("<img/>",{class:"img-fullscreen",src:imgUrl,title:testo+" - Clicca e vai alla mia pagina Instagram",style:"height:"+($('.riferimento').height()-margineTop)*0.8+"px"}))
              )
            );
          }

          $(".chiudi").click(function() {
            $(".fullscreen").remove();
          });

        });

      }

      function eventiTesto()
      {
        if($(".riferimento").width()>720 && !Modernizr.touch)
        {
          $(".item").each(function(){
            $(this).find(".details").css("bottom","-100px");
            $(this).find("img").css("opacity",".7");
          });
          $(".feed.item").mouseenter(function() {
            $(this).find(".details").css("bottom","0px");
            $(this).find("img").css("opacity","1");
          });
          $(".feed.item").mouseleave(function() {
            $(this).find(".details").css("bottom","-100px");
            $(this).find("img").css("opacity",".7");

          });
        }
        else {
          $(".item").each(function(){
            $(this).find(".details").css("bottom","0px");
            $(this).find("img").css("margin-bottom","50px");
            $(this).find("img").css("opacity","1");
          });
          $(".feed.item").off("mouseenter");
          $(".feed.item").off("mouseleave");
        }
      }

      //#############################################################################

      function quantiRiquadri()
      {
        var urlSito;
        if(document.location.pathname.match(/[^\/]+$/))
          urlSito=document.location.pathname.match(/[^\/]+$/)[0];

        var quanti=8;
        if(urlSito)
        {
          if(urlSito=="instagram")
            quanti=16;
        }
        return quanti;
      }

    }
}

}]);
