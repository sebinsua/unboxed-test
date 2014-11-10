'use strict';

describe('Service: GithubUserLanguageService', function () {

  // load the controller's module
  beforeEach(module('unboxedTestApp'));

  var GithubUserLanguageService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_GithubUserLanguageService_) {
    GithubUserLanguageService = _GithubUserLanguageService_;
  }));

  it('should exist', function () {
    expect(GithubUserLanguageService).toBeDefined();
  });

  describe('#getUsersFavouriteLanguage()', function () {

    it('should exist', function () {
      expect(GithubUserLanguageService.getUsersFavouriteLanguage).toBeDefined();
    });

    it('should call #getUsersRepositories()', inject(function ($q) {
      spyOn(GithubUserLanguageService, 'getUsersRepositories').and.returnValue($q.defer().promise);

      GithubUserLanguageService.getUsersFavouriteLanguage('sebinsua');
      expect(GithubUserLanguageService.getUsersRepositories).toHaveBeenCalled();
    }));

    it('should call #userReposToUserLanguage()', inject(function ($q) {
      spyOn(GithubUserLanguageService, 'getUsersRepositories').and.returnValue($q.defer().promise);
      spyOn(GithubUserLanguageService, 'userReposToUserLanguage');

      GithubUserLanguageService.getUsersFavouriteLanguage('sebinsua').then(function () {
        expect(GithubUserLanguageService.userReposToUserLanguage).toHaveBeenCalled();
      });
    }));

  });

  describe('#getUsersRepositories()', function () {

    it('should exist', function () {
      expect(GithubUserLanguageService.getUsersRepositories).toBeDefined();
    });

  });

  describe('#userReposToUserLanguage()', function () {

    it('should exist', function () {
      expect(GithubUserLanguageService.userReposToUserLanguage).toBeDefined();
    });

    it('should return undefined when there are no repositories', function () {
        var language = GithubUserLanguageService.userReposToUserLanguage([]);
        expect(language).toEqual(undefined);
    });

    it('should return the only language if there is only one repository', function () {
        var repositories = [
          { language: 'JavaScript' }
        ];

        var language = GithubUserLanguageService.userReposToUserLanguage(repositories);
        expect(language).toEqual('JavaScript');
    });

    it('should return the first language if there are equal numbers of repositories that are favourites', function () {
        var repositories = [
          { language: 'JavaScript' },
          { language: 'Swift' },
          { language: 'JavaScript' },
          { language: 'Swift' }
        ];

        var language = GithubUserLanguageService.userReposToUserLanguage(repositories);
        expect(language).toEqual('JavaScript');
    });

    it('should return the string null if the favourite language was indeterminate on Github', function () {
        var repositories = [
          { language: null },
          { language: null },
          { language: null },
          { language: 'Swift' }
        ];

        var language = GithubUserLanguageService.userReposToUserLanguage(repositories);
        expect(language).toEqual('Swift');
    });

    it('should return the correct language if there is a favourite amongst them', function () {
        var repositories = [
          { language: 'JavaScript' },
          { language: 'Swift' },
          { language: 'Objective-C' },
          { language: 'Clojure' },
          { language: 'Clojure' },
          { language: 'Swift' },
          { language: 'JavaScript' },
          { language: 'Clojure' },
          { language: 'Clojure' }
        ];

        var language = GithubUserLanguageService.userReposToUserLanguage(repositories);
        expect(language).toEqual('Clojure');
    });

  })

});
