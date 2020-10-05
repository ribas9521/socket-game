import GameController from '../controller/Game'
import { BulletProps } from '../interface/Bullet'
import { Movement, PlayerProps } from '../interface/Player'
import { Socket } from 'socket.io'

class SocketControler {
  private gameController: GameController;
  public io: SocketIO.Server;
  constructor(io: SocketIO.Server) {
    this.io = io
    this.gameController = new GameController()
  }

  public setEventListeners(): void {
    this.io.on('connection', (socket: Socket) => {
      const playerId = socket.id

      console.log(`> New connection: ${playerId}`)

      const newPlayer = this.gameController.createPlayer(playerId)

      socket.emit('player-list', this.gameController.getPlayerList())

      this.io.emit('add-player', newPlayer)

      socket.on('disconnect', () => {
        this.gameController.removePlayer(playerId)
        console.log(`> Player disconnected: ${playerId}`)
      })

      socket.on('update-position', (player: PlayerProps) => {
        this.io.emit('update-position', player)
      })

      socket.on('bullet', (bullet: BulletProps) => {
        this.io.emit('bullet', bullet)
      })
      socket.on('player-movement', (movement: Movement) => {
        console.log(movement)
        this.io.emit('player-movement', movement)
      })
    })
  }
}

export default SocketControler
