'use strict';

/**
 * @ngdoc function
 * @name clickClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clickClientApp
 */
angular.module('clickClientApp')
  .controller('MainCtrl', function (gameService) {
    var vm = this;
    vm.step = 1;
    // vm.games = [{
    // 	rows: 5,
    // 	columns: 6,
    // 	maxPlayers: 4,
    // 	minPlayers: 2,
    // 	blockTime: 1,
    // 	players: 3,
    // 	startTime: '9 mins'
    // }];

    gameService.fetchGames().then(function(games){
    	vm.games = games;
    });
  });

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
    var gameList = $resource('http://localhost:1337/games',{},{
    	fetch: {
    		method: 'GET',
    		isArray: true
    	}
    });

    var gameLobby = $resource('http://localhost:1337/game/:id',{
    	id: '@id'
    },{
    	fetch: {
    		method: 'GET'
    	}
    })
    service.fetchGames = function(){
      return $q(function(resolve, reject){
        gameList.fetch(function(response){
          if(response.message){
            reject(null);
          } else {
            resolve(response);
          }
        })
      });
    };

    service.fetchGameLobby = function(gameId){
      return $q(function(resolve, reject){
        gameLobby.fetch({id: gameId}, function(response){
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
