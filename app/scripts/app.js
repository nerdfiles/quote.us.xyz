'use strict';

define([
  "angularAMD",
  "leaflet",
  "osm",
  "angular-route",
  "angular-animate",
  "angular-aria",
  "angular-messages",
  "angular-cookies",
  "angular-resource",
  "angular-sanitize",
  "angular-storage",
  "angularfire",
  "angular-material",
  "angular-waypoints"
], function (angularAMD, leaflet, OSMBuildings) {

  //window.OSMBuildings = OSMBuildings;

  /**
   * @ngdoc overview
   * @name blocknext
   * @description
   * # blocknext.com Web application.
   *
   * Main module of the application.
   */
  var app = angular.module("blocknext", [
    'firebase',
    "ngRoute",
    "ngAnimate",
    "ngCookies",
    "ngResource",
    "ngSanitize",
    'ngAria',
    'ngMessages',
    'leaflet-directive',
    'ngStorage',
    'ngMaterial',
    'zumba.angular-waypoints'
  ]);

  app.config(['$routeProvider', 'SECURED_ROUTES', function($routeProvider, SECURED_ROUTES) {
    $routeProvider.whenAuthenticated = function(path, route) {
      route.resolve = route.resolve || {};
      route.resolve.user = ['Auth', function(Auth) {
        return Auth.$requireAuth();
      }];
      $routeProvider.when(path, route);
      SECURED_ROUTES[path] = true;
      return $routeProvider;
    };
  }])

  .constant('FBURL', 'https://blocknext.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password'])
  .constant('loginRedirectPath', '/login')

  .factory('Ref', ['$window', 'FBURL', function($window, FBURL) {
    return new $window.Firebase(FBURL);
  }])

  .factory('Auth', ['$firebaseAuth', 'Ref', function($firebaseAuth, Ref) {
    return $firebaseAuth(Ref);
  }])

  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);
    //$locationProvider.hashPrefix(!);
    $routeProvider
      .when("/home/:section?", angularAMD.route({
        templateUrl   : 'views/home.html',
        controllerUrl : 'controller/home_ctrl'
      }))

      .when('/main', angularAMD.route({
        templateUrl   : 'views/main.html',
        controllerUrl : 'controller/main_ctrl'
      }))

      .when('/chat', angularAMD.route({
        templateUrl   : 'views/chat.html',
        controllerUrl : 'controller/chat_ctrl'
      }))

      .when('/login', angularAMD.route({
        templateUrl   : 'views/login.html',
        controllerUrl : 'controller/login_ctrl'
      }))

      .whenAuthenticated('/account', angularAMD.route({
        templateUrl   : 'views/account.html',
        controllerUrl : 'controller/account_ctrl'
      }))
      .otherwise({redirectTo: '/home'});
  }])

  .run([
    '$rootScope',
    '$routeParams',
    '$location',
    'Auth',
    'SECURED_ROUTES',
    'loginRedirectPath',
    '$anchorScroll',
    function($rootScope, $routeParams, $location, Auth, SECURED_ROUTES, loginRedirectPath, $anchorScroll) {

      $rootScope.scrollTo = function(id) {
        var old = $location.hash();
        $location.hash(id);
        $anchorScroll();
        $location.hash(old);
      };

      Auth.$onAuth(check);
      $rootScope.$on('$routeChangeError', function(e, next, prev, err) {
        if( err === 'AUTH_REQUIRED' ) {
          $location.path(loginRedirectPath);
        }
      });

      function check (user) {
        if ( !user && authRequired($location.path()) ) {
          $location.path(loginRedirectPath);
        }
      }

      function authRequired (path) {
        return SECURED_ROUTES.hasOwnProperty(path);
      }
    }
  ])

  .constant('SECURED_ROUTES', {});

  return angularAMD.bootstrap(app);

});
