'use strict';

/**
 * @ngdoc function
 * @name clickClientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clickClientApp
 */
angular.module('clickClientApp')
  .controller('LobbyCtrl', function ($routeParams, $interval, _, gameService, userService) {
    var vm = this;
    vm.gameId = $routeParams.gameId;
    vm.userId = $routeParams.userId;
    vm.gameService = gameService;
    vm.squareColors={};

    vm.range = function(n) {
        return _.range(1,n);
    };

    vm.gameService.fetchGameLobby(vm.gameId).then(function(game){
    	vm.game = game;
    	vm.user = _.filter(vm.game.game.players, function(p){
    		return p.id === vm.userId;
    	});
    });    

    vm.cellId = function(row, column){
    	return ((row-1)*vm.game.game.columns)+column;
    };
    vm.click = function(row, column){
    	var sqId = vm.cellId(row, column);
    	vm.gameService.score(vm.gameId, vm.userId, sqId).then(function(res){
    	});
    };

    vm.getStyle = function(row, column){
    	var sqId = vm.cellId(row, column);
    	var applyColor =  vm.game.state[sqId] ? vm.game.state[sqId] : vm.onOver ? vm.user.color.color : 'white';
    	return {'background-color': applyColor}
    };

    $interval(function(){
    	vm.gameService.fetchGameLobby(vm.gameId).then(function(game){    		
    		if(vm.game){    			
			   vm.game = game;
		    }
    	});
    },2000);
  });

