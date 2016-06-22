'use strict';

/**
 * @ngdoc function
 * @name clickClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clickClientApp
 */
angular.module('clickClientApp')
  .controller('MainCtrl', function ($window, gameService, userService) {
    var vm = this;
    vm.step = 1;

    vm.createUser = function(userName){
     userService.createUser(userName).then(function(user){
       if(user){
         vm.step = 2;
         vm.userId = user.user.id;
       }
     });
    };

    vm.createGame = function(gameParams){
        gameService.createGame(gameParams, vm.userId).then(function(game){
          if(game){
            gameService.fetchGames().then(function(games){
                vm.games = games;
                var url = '/#/lobby/'+ game.game.id;
                $window.open(url);
            });
          }
        });
    };

    vm.register = function(userName, gameId){
      userService.createUser(userName).then(function(user){
       if(user){
        vm.userId = user.user.id;
         gameService.register(gameId, user.user.id).then(function(){
            //open game lobby
         });
       }
     });
    };

    vm.selectGame = function(gameId){
      vm.selectedGame = gameId;
      console.log(vm.userId);
      if(vm.userId){
        gameService.register(gameId, vm.userId).then(function(){
            //open game lobby
        });
      }
    };

    gameService.fetchGames().then(function(games){
    	vm.games = games;
    });
  });

  angular.module('clickClientApp')
  .service('gameService', function($resource, $q) {

    var service = this;
    var gameList = $resource('http://localhost:1337/games',{},{
    	fetch: {
    		method: 'GET',
    		isArray: true
    	}
    });

    var game = $resource('http://localhost:1337/user/:id/game',{
        id: '@id'
    },{
        create: {
            method: 'POST'
        }
    });

    var register =$resource('http://localhost:1337/user/:id/game/:gid/register',{
        id: '@id',
        gid: '@gid'
    },{
        create: {
            method: 'POST'
        }
    });

    var gameLobby = $resource('http://localhost:1337/game/:id',{
    	id: '@id'
    },{
    	fetch: {
    		method: 'GET'
    	}
    });

    service.register = function(gameId, userId){
        console.log(userId);
      return $q(function(resolve, reject){
        register.create({id: userId, gid: gameId}, function(response){
          if(response.message){
            reject(null);
          } else {
            resolve(response);
          }
        })
      });  
    };

    service.createGame = function(gameParams, userId){
      return $q(function(resolve, reject){
        game.create({id: userId}, {game: gameParams}, function(response){
          if(response.message){
            reject(null);
          } else {
            resolve(response);
          }
        })
      });
    };

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
  });

  angular.module('clickClientApp')
  .service('userService', function($resource, $q) {

    var service = this;
    var user = $resource('http://localhost:1337/user',{},{
        create: {
            method: 'POST'
        }
    });

    service.createUser = function(userName){
      return $q(function(resolve, reject){
        user.create({name: userName}, function(response){
          if(response.message){
            reject(null);
          } else {
            resolve(response);
          }
        })
      });
    };
  });