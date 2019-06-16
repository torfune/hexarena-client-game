import Game from '../classes/Game'
import { Ticker } from 'pixi.js'

const ticker = Ticker.shared

const createGameLoop = (updateFunction: () => void, game: Game) => {
  ticker.add(updateFunction, game)
  return ticker
}

export default createGameLoop
