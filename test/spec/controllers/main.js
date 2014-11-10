'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('unboxedTestApp'));

  var MainCtrl, mockedGithubUserLanguageService, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    mockedGithubUserLanguageService = {
      mockLanguage: 'JavaScript',
      getUsersFavouriteLanguage: function () {
        var deferred = $q.defer();
        if (this.mockLanguage) {
          deferred.resolve(this.mockLanguage);
        } else {
          deferred.reject('Some error message.');
        }

        return deferred.promise;
      }
    };
    scope = $rootScope.$new();

    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      GithubUserLanguageService: mockedGithubUserLanguageService
    });
  }));

  it('should exist', function () {
    expect(MainCtrl).toBeDefined();
  });

  describe('#submitForm()', function () {
    it('should exist', function () {
      expect(scope.submitForm).toBeDefined();
    });

    it('should set the scope with a users favourite language', function () {

      scope.usernameInput = 'sebinsua';
      scope.submitForm();
      scope.$apply();

      expect(scope.username).toEqual('sebinsua');
      expect(scope.language).toEqual('JavaScript');
      expect(scope.error).toEqual(undefined);
    });

    it('should set the scope with an error if the promise errors', function () {
      mockedGithubUserLanguageService.mockLanguage = null;

      scope.usernameInput = 'sebinsua';
      scope.submitForm();
      scope.$apply();

      expect(scope.username).toEqual(undefined);
      expect(scope.language).toEqual(undefined);
      expect(scope.error).toEqual('Some error message.');
    });


  })


});
