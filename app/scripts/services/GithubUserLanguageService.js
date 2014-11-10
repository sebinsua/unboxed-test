'use strict';

angular.module('unboxedTestApp')
  .service('GithubUserLanguageService', ["$github", function ($github) {

    this.userReposToUserLanguage = function (repos) {

      var toLanguageNumberOfReposTuple = function (groupedRepos, language) {
        var numberOfRepos = groupedRepos.length;
        return [language, numberOfRepos];
      };
      var byNumberOfRepos = function (languageNumberOfReposTuple) {
        var numberOfReposIndex = 1;
        return languageNumberOfReposTuple[numberOfReposIndex];
      };

      // We remove all indeterminate languages as it does not make sense
      // to assume that all repositories from which Github could not compute
      // the language are aggregatable into a singlular favourite.
      repos = _.filter(repos, function (r) { return r.language !== null; });

      if (!repos || repos.length === 0) {
        return undefined;
      }

      var language = _.chain(repos).groupBy('language').
                       map(toLanguageNumberOfReposTuple).
                       max(byNumberOfRepos).first().
                       value();

      return language;
    };

    this.getUsersRepositories = function (username) {
      return $github.getUser().then(function (userApi) {
        return userApi.userRepos(username);
      });
    };

    this.getUsersFavouriteLanguage = function (username) {
      var self = this;
      return this.getUsersRepositories(username).then(function (userRepos) {
        var language = self.userReposToUserLanguage(userRepos);
        return language;
      });
    };

  }]);
