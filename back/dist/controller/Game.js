"use strict";Object.defineProperty(exports, "__esModule", {value: true});

class GameController {
  

  constructor () {
    this.playerList = []
  }

   addPlayer (player) {
    this.playerList.push(player)
  }

   createPlayer (playerId) {
    const player = {
      x: 300,
      y: 300,
      id: playerId
    }
    this.playerList.push(player)
    return player
  }

   getPlayerList () {
    return this.playerList
  }

   removePlayer (playerId) {
    this.playerList = this.playerList.filter((player) => player.id !== playerId)
  }
}

exports. default = GameController
