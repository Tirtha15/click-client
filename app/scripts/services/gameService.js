'use strict';

angular.module('clickClientApp')
  .service('gameService', function($resource, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var service = this;

    // var questionResource = $resource(envConfig.apiBase + '/ops/api/category/:id/:field/questions', {
    //   id: '@id',
    //   field: '@field'
    // });
    // var opsTagResource = $resource(envConfig.apiBase + '/ops/api/category/:id/opstags', {
    //   id: '@id'
    // }, {
    //   fetch: {
    //     method: 'GET',
    //     isArray: true
    //   }
    // });
    var gameList = $resource('http://localhost:1337/games');
    service.fetchGames = function(){
      return $q(function(resolve, reject){
        gameList.get(function(response){
          if(response.message){
            reject(null);
          } else {
            resolve(response);
          }
        })
      });
    };
    // service.loadedCategories = {};

    // service.fetchQuestions = function(categoryId, questionField) {
    //   return $q(function(resolve, reject) {
    //     questionResource.get({
    //       id: categoryId,
    //       field: questionField
    //     }, function(response) {
    //       if (response.message) {
    //         reject(null);
    //       } else {
    //         resolve(response.category[questionField]);
    //       }
    //     });
    //   });
    // }

    // service.fetchOpsTags = function(categoryId) {
    //   return $q(function(resolve, reject) {
    //     if (service.loadedCategories[categoryId] && service.loadedCategories[categoryId].opsTags) resolve(service.loadedCategories[categoryId].opsTags);
    //     else {
    //       opsTagResource.fetch({
    //         id: categoryId
    //       }, function(response) {
    //         if (!service.loadedCategories[categoryId]) {
    //           service.loadedCategories[categoryId] = {};
    //           reject(response);
    //         }
    //         service.loadedCategories[categoryId].opsTags = response;
    //         resolve(response);
    //       });
    //     }
    //   });
    // }
  });
