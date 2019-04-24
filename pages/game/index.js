import { observer } from 'mobx-react-lite'
import DefeatModal from './screens/DefeatModal'
import Diplomacy from './hud/Diplomacy'
import EndScreen from './screens/EndScreen'
import ErrorModal from './screens/ErrorModal'
import game from 'game'
import GameTime from './hud/GameTime'
import HoverPreview from './hud/HoverPreview'
import Leaderboard from './hud/Leaderboard'
import React, { useEffect, useState } from 'react'
import SpectateCloseButton from './screens/SpectateCloseButton'
import store from 'store'
import styled from 'styled-components'
import WaitingScreen from './screens/WaitingScreen'
import Wood from './hud/Wood'
import YourEmpire from './hud/YourEmpire'
import { animated, useTransition, config } from 'react-spring'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`

const GameCanvas = styled.div`
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`

let timeout

const Game = observer(() => {
  const [showWaitingScreen, setShowWaitingScreen] = useState(false)
  const transitions = useTransition(showWaitingScreen, null, {
    config: config.slow,
    from: { opacity: 1 },
    leave: { opacity: 0 },
  })

  useEffect(() => {
    const element = document.getElementById('game')
    const name = window.localStorage.getItem('name')
    const browserId = localStorage.getItem('browserId')

    game.start(element, name, browserId)

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
      setShowWaitingScreen(true)
    } else {
      timeout = setTimeout(() => {
        setShowWaitingScreen(false)
      }, 500)
    }
  }, [store.status])

  const { status, showHud, player, spectating, error } = store

  return (
    <Container>
      <GameCanvas id="game" visible={status === 'running'} />

      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props}>
              <WaitingScreen />
            </animated.div>
          )
      )}

      {status === 'running' && (
        <>
          <GameTime />

          {showHud && player.alive && (
            <>
              <Diplomacy />
              <HoverPreview />
              <Leaderboard />
              <Wood />
              <YourEmpire />
            </>
          )}

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

      {error && <ErrorModal message={error} />}
    </Container>
  )
})

export default Game
