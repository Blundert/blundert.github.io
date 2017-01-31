!function(){"use strict";angular.module("config",["ui.router","pascalprecht.translate"]),angular.module("blundert",["config","ngAnimate","ngCookies","ui.router","ngMessages","ngSanitize","ui.scrollpoint","pascalprecht.translate"])}();var MainController=function(n,a){var o="Main",t=this;this.prova=!0,this.allLoaded=!1;var s=n.$on("showSpinner",function(n,o){a(function(){o.hasOwnProperty("value")&&a(function(){t.allLoaded=o.value},1e3)})});n.$on("$destroy",s),angular.extend(this,{name:o})};MainController.$inject=["$rootScope","$timeout"],angular.module("blundert").component("mainComponent",{templateUrl:"app/components/main/main.html",controller:MainController});var LoadingController=function(){var n="Loading";angular.extend(this,{name:n})};LoadingController.$inject=[],angular.module("blundert").component("loadingComponent",{templateUrl:"app/components/loading/loading.html",controller:LoadingController});/**
 * @ngdoc service
 * @name blundert:LandingPageService
 * @this
 * @requires
 * $q
 * @description
 *
 * @version v1.2.0 - 2016-06-20
 * @link http://www.matteogranzotto.com
 * @author Matteo Granzotto <granzotto.matteo@gmail.com> (http://matteogranzotto.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
var HomeService=function(n,a,o){function t(){var o=a.defer(),t="/assets/images/me.jpg";return n.get(t).then(function(n){o.resolve(n)},function(n){o.reject(n)}),o.promise}var s="Home Service";angular.extend(this,{name:s,getImage:t})};HomeService.$inject=["$http","$q","serverUtils"],angular.module("blundert").service("HomeService",HomeService);var HomeController=function(n,a){this.name=name,n.getImage().then(function(n){a.$emit("showSpinner",{value:!0})}),angular.extend(this,{name:name})};HomeController.$inject=["HomeService","$rootScope"],angular.module("blundert").component("homeComponent",{templateUrl:"app/components/home/home.html",controller:HomeController}),angular.module("blundert").config(["$translateProvider",function(n){n.translations("it",{}),n.translations("en",{}),n.preferredLanguage("it")}]),angular.module("config").config(["$stateProvider","$urlRouterProvider","$locationProvider",function(n,a,o){o.html5Mode(!0).hashPrefix("!"),a.otherwise("/"),n.state("home",{url:"/",component:"homeComponent"})}]).constant("serverUtils",function(){var n=document.getElementsByTagName("script"),a=n[n.length-1],o=a.src.split("/"),t=o[0],s=o[2],e="";return e=s.indexOf("localhost")>-1?"http://localhost:3000":s.indexOf("test")>-1?"https://test-api-blundert.herokuapp.com":"https://api-blundert.herokuapp.com",{url:e,urlFE:t+"//"+s}}()),angular.module("blundert").run(["$templateCache",function(n){n.put("app/components/home/home.html",'<div class="content"><div class="badgescard-top"><span class="tooltip-container"><a href="https://www.facebook.com/Blundert"><span class="fa fa-facebook-official hide-on-small"></span></a> <span class="tooltip tooltip-top tooltip-p">Facebook</span></span> <span class="tooltip-container"><a href="https://twitter.com/Blundert"><span class="fa fa-twitter"></span></a> <span class="tooltip tooltip-top tooltip-p">Twitter</span></span> <span class="tooltip-container"><a href="https://www.linkedin.com/in/matteogranzotto"><span class="fa fa-linkedin"></span></a> <span class="tooltip tooltip-top tooltip-p">LinkedIn</span></span> <span class="tooltip-container"><a href="https://www.instagram.com/blunderttt/"><span class="fa fa-instagram hide-on-small"></span></a> <span class="tooltip tooltip-top tooltip-p">Instagram</span></span> <span class="tooltip-container"><a href="https://github.com/Blundert"><span class="fa fa-github"></span></a> <span class="tooltip tooltip-top tooltip-p">Github</span></span> <span class="tooltip-container"><a href="https://medium.com/@Blundert"><span class="fa fa-medium"></span></a> <span class="tooltip tooltip-top tooltip-p">Medium</span></span></div><div class="card"><div class="firstinfo"><img src="/assets/images/me.jpg"><div class="pulse"></div><div class="profileinfo"><a href="http://www.matteogranzotto.com"><h1>Matteo Granzotto</h1></a><h3>Frontend Developer</h3><p class="bio">Frontend Developer at Moku. Consultant at Finantix. Comics lover.</p></div></div></div><div class="badgescard-bottom"><span class="tooltip-container"><span class="devicons devicons-git"></span> <span class="tooltip tooltip-p">Git</span></span> <span class="tooltip-container"><span class="devicons devicons-codepen hide-on-medium"></span> <span class="tooltip tooltip-p">CodePen</span></span> <span class="tooltip-container"><span class="devicons devicons-html5"></span> <span class="tooltip tooltip-p">HTML5</span></span> <span class="tooltip-container"><span class="devicons devicons-javascript"></span> <span class="tooltip tooltip-p">Javascript</span></span> <span class="tooltip-container"><span class="devicons devicons-gulp hide-on-medium"></span> <span class="tooltip tooltip-p">Gulp.js</span></span> <span class="tooltip-container"><span class="devicons devicons-angular"></span> <span class="tooltip tooltip-p">Angular.js</span></span> <span class="tooltip-container"><span class="devicons devicons-sass hide-on-medium"></span> <span class="tooltip tooltip-p">Sass</span></span> <span class="tooltip-container"><span class="devicons devicons-css3_full"></span> <span class="tooltip tooltip-p">CSS3</span></span> <span class="tooltip-container"><span class="devicons devicons-react hide-on-medium"></span> <span class="tooltip tooltip-p">React.js</span></span> <span class="tooltip-container"><span class="devicons devicons-nodejs_small hide-on-medium"></span> <span class="tooltip tooltip-p">Node.js</span></span> <span class="tooltip-container"><span class="devicons devicons-jquery"></span> <span class="tooltip tooltip-p">jQuery</span></span></div></div>'),n.put("app/components/loading/loading.html",'<div class="pacman"><div class="pacman-top"></div><div class="pacman-bottom"></div></div>'),n.put("app/components/main/main.html",'<div ng-show="$ctrl.allLoaded"><ui-view></ui-view></div><div layout="row" ng-show="!$ctrl.allLoaded"><loading-component></loading-component></div>')}]);