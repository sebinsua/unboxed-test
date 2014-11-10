'use strict';

/**
 * @ngdoc function
 * @name unboxedTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the unboxedTestApp
 */
angular.module('unboxedTestApp')
  .controller('MainCtrl', ["$scope", "GithubUserLanguageService", function ($scope, GithubUserLanguageService) {

    $scope.submitForm = function () {
      var username = $scope.usernameInput;
      GithubUserLanguageService.getUsersFavouriteLanguage(username).then(function success(language) {
        $scope.username = username;
        $scope.language = language;
      }, function failed(error) {
        $scope.error = error;
      });
    };

  }]);
