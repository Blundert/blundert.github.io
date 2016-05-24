app.factory("copertina", [ function() {

  return {

    adjust : function() {
      $(document).ready(function(){
          //variabils
          var posizioneh1=50;
          var urlSito;

          //setup
          $(".copertina").css("height",$(window).height()-64);
          $(".copertina").css("margin-bottom",64);
          if(document.location.pathname.match(/[^\/]+$/))
            urlSito=document.location.pathname.match(/[^\/]+$/)[0];
          if($("head").find("title").text()!="Errore - Matteo Granzotto")
            $(".copertina").css("background-position-y",$("header").height());
          $("#wrapper").css("margin-top",$("header").height()*-1);
          $(".copertina").find("h1").css("padding-top",($(window).height()/100)*posizioneh1);

          //events
          $(window).resize(function() {
              $(".copertina").css("height",$(window).height()-64);
              $(".copertina").css("margin-bottom",64);
              if(document.location.pathname.match(/[^\/]+$/))
                urlSito=document.location.pathname.match(/[^\/]+$/)[0];
              if($("head").find("title").text()!="Errore - Matteo Granzotto")
                $(".copertina").css("background-position-y",$("header").height());
              $("#wrapper").css("margin-top",$("header").height()*-1);
              $(".copertina").find("h1").css("padding-top",($(window).height()/100)*posizioneh1);
          });


        });
    }
  }

}]);
