import { observer } from 'mobx-react-lite'
import DefeatModal from './screens/DefeatModal'
import Diplomacy from './hud/Diplomacy'
import HoverPreview from './hud/HoverPreview'
import EndScreen from './screens/EndScreen'
import ErrorModal from './screens/ErrorModal'
import GameTime from './hud/GameTime'
import Leaderboard from './hud/Leaderboard'
import { useEffect, useState } from 'react'
import SpectateCloseButton from './screens/SpectateCloseButton'
import styled from 'styled-components'
import Lobby from './screens/Lobby'
import Gold from './hud/Gold'
import YourEmpire from './hud/YourEmpire'
import { animated, useTransition } from 'react-spring'
import SurrenderButton from './hud/SurrenderButton'
import game from '../../game'
import store from '../../store'
import { useAuth } from '../../auth'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`

interface GameCanvasProps {
  visible: boolean
}
const GameCanvas = styled.div<GameCanvasProps>`
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`

let timeout: NodeJS.Timeout

const Game = observer(() => {
  const [showLobby, setShowLobby] = useState(false)
  const { loggedIn, accessToken } = useAuth()
  const transitions = useTransition(showLobby, null, {
    from: { opacity: 1 },
    leave: { opacity: 0 },
  })

  useEffect(() => {
    const element = document.getElementById('game')
    const name = window.localStorage.getItem('name')

    if (!element) throw Error('Cannot find Game canvas element.')

    game.start(element, name, loggedIn ? accessToken : null)

    window.addEventListener('resize', game.updateScreenSize.bind(game))

    return () => {
      game.stop()
      window.removeEventListener('resize', game.updateScreenSize)
    }
  }, [])

  useEffect(() => {
    const show = store.status === 'pending' || store.status === 'starting'

    if (timeout) {
      clearTimeout(timeout)
    }

    if (show) {
      setShowLobby(true)
    } else {
      timeout = setTimeout(() => {
        setShowLobby(false)
      }, 500)
    }
  }, [store.status])

  const { status, showHud, players, player, spectating, error } = store

  let showSurrender = false
  let alivePlayers = 0

  for (let i = 0; i < players.length; i++) {
    if (players[i].alive) {
      alivePlayers++
    }
  }

  if (player && alivePlayers === 3 && (!player.ally || !player.ally.alive)) {
    for (let i = 0; i < players.length; i++) {
      const p = players[i]
      if (p.id !== player.id && p.ally && p.ally.alive) {
        showSurrender = true
        break
      }
    }
  }

  return (
    <Container>
      <GameCanvas
        id="game"
        visible={status === 'running' || status === 'finished'}
      />

      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props}>
              <Lobby />
            </animated.div>
          )
      )}

      {status === 'running' && player && (
        <>
          <GameTime />

          {showHud && player.alive && (
            <>
              <Diplomacy />
              <HoverPreview />
              <Leaderboard />
              <Gold />
              <YourEmpire />
            </>
          )}

          {showSurrender && <SurrenderButton />}

          {!player.alive &&
            (spectating ? (
              <>
                <SpectateCloseButton />
                <Leaderboard />
              </>
            ) : (
              <DefeatModal />
            ))}
        </>
      )}

      {status === 'finished' && <EndScreen />}

      {error && <ErrorModal message={error.message} goHome={error.goHome} />}
    </Container>
  )
})

export default Game