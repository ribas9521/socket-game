import { PlayerProps } from '../interface/Player'

class GameController {
  private playerList: PlayerProps[];

  constructor () {
    this.playerList = []
  }

  public addPlayer (player: PlayerProps): void {
    this.playerList.push(player)
  }

  public createPlayer (playerId: string): PlayerProps {
    const player: PlayerProps = {
      x: 300,
      y: 300,
      id: playerId
    }
    this.playerList.push(player)
    return player
  }

  public getPlayerList (): PlayerProps[] {
    return this.playerList
  }

  public removePlayer (playerId: string): void {
    this.playerList = this.playerList.filter((player) => player.id !== playerId)
  }
}

export default GameController
