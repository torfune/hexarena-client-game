import Game from './classes/Game'
import loadImages from './functions/loadImages'
import { GAMESERVER_URL } from '../config'

const game = new Game()
let imagesLoaded = false

const startGame = async (rootElement, reactMethods, name, pattern) => {
  if (!imagesLoaded) {
    await loadImages()
    imagesLoaded = true

    try {
      const response = await fetch(`${GAMESERVER_URL}/config`)
      const gsConfig = await response.json()

      window.gsConfig = gsConfig

      reactMethods.setMinPlayers(gsConfig.MIN_PLAYERS)
    } catch (err) {
      reactMethods.showConnectionError()
    }
  }

  game.start(rootElement, reactMethods, name, pattern)

  // only for debug purposes
  window.game = game
}

const stopGame = () => {
  game.stop()
}

const sendMessage = game.sendMessage
const updateScreenSize = game.updateScreenSize

// named export for React layer
export { startGame, stopGame, sendMessage, updateScreenSize }

// default export for Game layer
export default game
