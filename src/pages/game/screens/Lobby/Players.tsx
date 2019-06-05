import styled from 'styled-components'
import { BOX_SHADOW } from '../../../../constants/react'
import { observer } from 'mobx-react-lite'
import store from '../../../../store'
import { useTransition } from 'react-spring'
import { useState } from 'react'
import game from '../../../../game'
import PatternSelector from './PatternSelector'
import React from 'react'
import shadeColor from '../../../../utils/shade'

const Container = styled.div`
  margin-top: 64px;
`

const Label = styled.p`
  font-weight: 600;
  font-size: 14px;
  color: #ddd;
  text-transform: uppercase;
  margin-top: 64px;
`

interface PatternProps {
  color?: string
}
const Pattern = styled.div<PatternProps>`
  visibility: ${props => (props.color ? 'visible' : 'hidden')};
  margin-left: -8px;
  border-radius: 8px;
  background: ${props => props.color || '#444'};
  box-shadow: ${props => (props.color ? BOX_SHADOW : null)};
  transition: 200ms;
`

const Name = styled.p`
  font-weight: 600;
  font-size: 28px;
  color: #222;
  margin-left: 24px;
  white-space: nowrap;
`

const You = styled.div<{ color: string }>`
  display: flex;
  background: #fff;
  border-radius: 4px;
  margin-top: 32px;
  margin-bottom: 48px;
  height: 64px;
  align-items: center;
  box-shadow: ${BOX_SHADOW};
  position: relative;
  width: 80%;
  border-right: 12px solid ${props => props.color};

  ${Pattern} {
    width: 80px;
    height: 80px;

    :hover {
      transform: scale(1.1);
      background: ${props => shadeColor(props.color, -10)};
    }
  }
`

const Player = styled.div<{ color?: string }>`
  display: flex;
  background: ${props => (props.color ? '#fff' : '#444')};
  opacity: ${props => (props.color ? 1 : 0.5)};
  border-radius: 4px;
  margin-top: 32px;
  margin-bottom: 16px;
  height: 44px;
  align-items: center;
  box-shadow: ${props => (props.color ? BOX_SHADOW : null)};
  border-right: 8px solid ${props => props.color || '#444'};

  ${Pattern} {
    width: 60px;
    height: 60px;
  }

  ${Name} {
    font-size: 20px;
    margin-left: 10px;

    @media (max-width: 1600px) {
      font-size: 16px;
      margin-left: 8px;
    }
  }
`

const OtherPlayers = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 64px;

  @media (max-width: 1600px) {
    grid-column-gap: 40px;
  }
`

const DarkOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: #000;
  opacity: 0.5;
`

interface UserTypeProps {
  fontSize: string
  marginRight: string
}
const UserType = styled.p<UserTypeProps>`
  font-weight: 600;
  font-size: ${props => props.fontSize};
  color: #666;
  margin-left: auto;
  margin-right: ${props => props.marginRight};
  text-transform: uppercase;
  position: relative;
  top: 1px;
`

const Players: React.FC = () => {
  const otherPlayers: Array<{
    name?: string
    pattern?: string
    registered?: boolean
  }> = []

  for (let i = 0; i < 6; i++) {
    const player = store.players[i]

    if (player && player.id === store.playerId) continue

    if (i < store.players.length) {
      otherPlayers.push({
        name: player.name,
        pattern: player.pattern,
        registered: player.registered,
      })
    } else {
      otherPlayers.push({})
    }
  }

  if (!store.player || !store.gsConfig) return null

  const { PATTERNS } = store.gsConfig
  const { pattern } = store.player
  const lockedPatterns = store.players
    .filter(player => player.pattern !== pattern)
    .map(({ pattern }) => pattern)

  const [showSelector, setShowSelector] = useState(false)
  const transitions = useTransition(showSelector, null, {
    config: { tension: 400 },
    from: { transform: 'scale(0)', opacity: 0 },
    enter: { transform: 'scale(1)', opacity: 1 },
    leave: { transform: 'scale(0)', opacity: 0 },
  })

  const handlePatternClick = () => {
    setShowSelector(true)
  }

  const handleClickOutside = () => {
    setShowSelector(false)
  }

  const handlePatternSelect = (pattern: string) => {
    if (lockedPatterns.includes(pattern)) return

    game.selectPattern(pattern)
    setShowSelector(false)
  }

  return (
    <Container>
      <Label>You</Label>
      <You color={store.player.pattern}>
        <Pattern color={store.player.pattern} onClick={handlePatternClick} />
        <Name>{store.player.name}</Name>
        <UserType marginRight="16px" fontSize="14px">
          {store.player.registered ? 'Registered' : 'Guest'}
        </UserType>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <PatternSelector
                key={key}
                style={props}
                allPatterns={PATTERNS}
                lockedPatterns={lockedPatterns}
                onPatternSelect={handlePatternSelect}
              />
            )
        )}

        {showSelector && <DarkOverlay onClick={handleClickOutside} />}
      </You>

      <Label>Other players</Label>

      <OtherPlayers>
        {otherPlayers.map((player, index) => (
          <Player key={index} color={player.pattern}>
            <Pattern color={player.pattern} />
            <Name>{player.name}</Name>
            {player.name && (
              <UserType marginRight="8px" fontSize="10px">
                {player.registered ? 'Registered' : 'Guest'}
              </UserType>
            )}
          </Player>
        ))}
      </OtherPlayers>
    </Container>
  )
}

export default observer(Players)
