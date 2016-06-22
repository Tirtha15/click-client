'use strict';

/**
 * @ngdoc overview
 * @name clickClientApp
 * @description
 * # clickClientApp
 *
 * Main module of the application.
 */
angular
  .module('clickClientApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .when('/lobby/:id', {
        templateUrl: 'views/lobby.html',
        controller: 'LobbyCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
