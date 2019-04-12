import React from 'react'
import styled from 'styled-components'
import Player from './Player'
import Chat from './Chat'
import store from '../../../../../store'
import { observer } from 'mobx-react-lite'
import game from '../../../../../game'

const Container = styled.div`
  position: absolute;
  top: 0;
  background: #444;
  width: 100vw;
  height: 100vh;
  padding: 128px;
  display: grid;
  grid-template-columns: 2fr 450px;
`

const Heading = styled.h2`
  color: #fff;
  font-size: 32px;
  text-align: center;
`

const Row = styled.div`
  margin-top: 64px;
  display: flex;
  justify-content: center;
`

const playersPerRoom = 6

const getWaitingMessage = (numberOfPlayers, minPlayers) => {
  const n = minPlayers - numberOfPlayers

  if (n <= 0 || numberOfPlayers === 0) {
    return '...'
  }

  if (n === 1) {
    return 'Waiting for 1 more player'
  } else {
    return `Waiting for ${n} more players`
  }
}

const WaitingScreen = () => {
  const players = []

  for (let i = 0; i < playersPerRoom; i++) {
    if (i < store.players.length) {
      players.push(store.players[i])
    } else {
      players.push({
        id: null,
        name: null,
        pattern: null,
      })
    }
  }

  return (
    <Container>
      <div>
        <Heading>
          {store.countdown !== null
            ? `Game starts in ${store.countdown} seconds`
            : getWaitingMessage(
                store.players.length,
                window.gsConfig.MIN_PLAYERS
              )}
        </Heading>
        <Row>
          {players.slice(0, 3).map(({ id, name, pattern }, index) => (
            <Player
              key={index}
              name={name}
              pattern={pattern}
              isThisPlayer={id === store.player.id}
              players={store.players}
              onPatternSelect={game.selectPattern}
            />
          ))}
        </Row>
        <Row>
          {players.slice(3, 6).map(({ id, name, pattern }, index) => (
            <Player
              key={index}
              name={name}
              pattern={pattern}
              isThisPlayer={id === store.player.id}
              players={store.players}
              onPatternSelect={game.selectPattern}
            />
          ))}
        </Row>
      </div>

      <Chat />
    </Container>
  )
}

export default observer(WaitingScreen)
