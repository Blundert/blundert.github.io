/**
 * angular-motion
 * @version v0.4.4 - 2016-03-31
 * @link http://mgcrea.github.io/angular-motion
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
var app = angular.module('matteogranzotto', ['ngRoute', 'ngAnimate', 'ngMaterial', 'angularCSS', 'ngMeta']);

app.config(function ($routeProvider, $locationProvider, ngMetaProvider) {
  $locationProvider.html5Mode(true);

  ngMetaProvider.useTitleSuffix(true);
  ngMetaProvider.setDefaultTitleSuffix(' | Matteo Granzotto');

  $routeProvider
    .when('/:lang', {
      templateUrl: 'views/home.html',
      controller:"homeController",
      meta: {
          'title':'Home',
          'description':'Homepage - Matteo Granzotto.'
      },
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
    .when('/:lang/bio', {
      templateUrl: 'views/bio.html',
      controller:"bioController",
      meta: {
          'title':'Bio',
          'description':'Bio - Matteo Granzotto.'
      },
      css: [
        {
          href: 'css/style-bio.css'
        }
      ]
    })
    .when('/:lang/progetti', {
      templateUrl: 'views/projects.html',
      controller:"homeController"
    })
    .when('/:lang/projects', {
      templateUrl: 'views/projects.html',
      controller:"homeController"
    })
    .when('/:lang/instagram', {
      templateUrl: 'views/instagram.html',
      controller:"instagramController",
      meta: {
          'title':'Instagram',
          'description':'Personal instagram - Matteo Granzotto.'
      },
      css: [
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
      redirectTo: '/it'
    });
})
.run(['ngMeta', function(ngMeta) {
  ngMeta.init();
}]);
