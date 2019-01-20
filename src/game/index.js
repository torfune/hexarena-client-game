import Game from './Game'

let game = null
let cancelAlliance = null

const startGame = (rootElement, setters) => {
  if (game) return

  game = new Game(rootElement, setters)
  cancelAlliance = game.cancelAlliance

  // only for debug purposes
  window.game = game
}

const clearGame = () => {
  game.clear()
  game = null
}

export { startGame, clearGame, cancelAlliance }
