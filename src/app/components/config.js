angular
    .module("config")
    .config(
        function (
          $stateProvider,
          $urlRouterProvider,
          $locationProvider
        ) {
          $locationProvider.html5Mode(true).hashPrefix('!');
          $urlRouterProvider.otherwise('/');
          $stateProvider
            .state('home', {
              url: '/',
              component: 'homeComponent'
            });

        }
    )
    .constant('serverUtils',
        (function () {
          var scripts = document.getElementsByTagName('script');
          var thisScript = scripts[scripts.length-1];
          var url = thisScript.src.split('/');
          var protocol = url[0];
          var fullDomain = url[2];
          var path = '';
          if (fullDomain.indexOf('localhost') > -1){
            path = 'http://localhost:3000';
          } else if (fullDomain.indexOf('test') > -1) {
            path = 'https://test-api-blundert.herokuapp.com';
          } else {
            path = 'https://api-blundert.herokuapp.com';
          }
          return  {
            url : path,
            urlFE: protocol+"//"+fullDomain
          };
        })()
    );
