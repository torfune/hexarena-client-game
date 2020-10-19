import GameMode from './GameMode'

interface FinishedGamePlayer {
  name: string
  eloChange: number
  pattern: string
  alive: boolean
}

interface FinishedGame {
  id: string
  time: number
  mode: GameMode
  ranked: boolean
  players: FinishedGamePlayer[][]
}

export default FinishedGame
export { FinishedGamePlayer }