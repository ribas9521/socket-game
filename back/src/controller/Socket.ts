import GameController from '../controller/Game'
import { BulletProps } from '../interface/Bullet'
import { PlayerProps } from '../interface/Player'

class SocketControler {
  private gameController: GameController;
  public io: SocketIO.Server;
  constructor (io: SocketIO.Server) {
    this.io = io
    this.gameController = new GameController()
  }

  public setEventListeners (): void {
    this.io.on('connection', (socket: SocketIO.Socket) => {
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
    })
  }
}

export default SocketControler
