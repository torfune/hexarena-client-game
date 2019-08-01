import GameMode from './GameMode'

interface RunningGamePlayer {
  name: string
  elo: number | null
  pattern: string
  alive: boolean
}

interface RunningGame {
  id: string
  finishesAt: number
  mode: GameMode
  balanced: boolean
  players: RunningGamePlayer[][]
}

export { RunningGamePlayer }
export default RunningGame
