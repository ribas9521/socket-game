"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Game = require('../controller/Game'); var _Game2 = _interopRequireDefault(_Game);



class SocketControler {
  
  
  constructor (io) {
    this.io = io
    this.gameController = new (0, _Game2.default)()
  }

   setEventListeners () {
    this.io.on('connection', (socket) => {
      const playerId = socket.id

      console.log(`> New connection: ${playerId}`)

      const newPlayer = this.gameController.createPlayer(playerId)

      socket.emit('player-list', this.gameController.getPlayerList())

      this.io.emit('add-player', newPlayer)

      socket.on('disconnect', () => {
        this.gameController.removePlayer(playerId)
        console.log(`> Player disconnected: ${playerId}`)
      })

      socket.on('update-position', (player) => {
        this.io.emit('update-position', player)
      })

      socket.on('bullet', (bullet) => {
        this.io.emit('bullet', bullet)
      })
    })
  }
}

exports. default = SocketControler
