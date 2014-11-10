'use strict';

/**
 * @ngdoc overview
 * @name unboxedTestApp
 * @description
 * # unboxedTestApp
 *
 * Main module of the application.
 */
angular
  .module('unboxedTestApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.github-adapter'
  ])
  .config(function ($routeProvider, $githubProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      $githubProvider.token('21a7ca7d4d54b81083a718794abec0b3e01d89db');
      $githubProvider.authType('oauth');
  });
