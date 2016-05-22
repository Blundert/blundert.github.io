var app = angular.module('matteogranzotto', ['ngRoute', 'ngAnimate', 'ngMaterial', 'angularCSS']);

app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/:lang', {
      templateUrl: 'views/home.html',
      controller:"homeController",
      css: [
        {
          href: 'css/style-index.css'
        },
        {
          href: 'css/style-instagram.css',
          persist: true
        },
        {
          href: 'css/medium-instagram.css',
          media: 'handheld, screen and (max-width:720px), only screen and (max-device-width:720px)',
          persist: true

        },
        {
          href: 'css/small-instagram.css',
          media: 'handheld, screen and (max-width:480px), only screen and (max-device-width:480px)',
          persist: true
        }
      ]
    })
    .otherwise({
      redirectTo: '/ita'
    });
});
