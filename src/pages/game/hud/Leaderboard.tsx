import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import store from '../../../store'
import getPlayerGroups from '../../../utils/getPlayerGroups'
import Header from '../../../components/Header'
import React from 'react'

const Container = styled.div`
  background: rgba(255, 255, 255, 0.92);
  bottom: 0;
  right: 0;
  min-height: 240px;
  width: 256px;
  position: absolute;
  user-select: none;
  border-top-left-radius: 8px;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  overflow: hidden;

  /* Resolution scaling */
  transform-origin: right bottom;
  transform: scale(${store.hudScale});
`

const Content = styled.div`
  padding: 20px 24px;
`

const Pattern = styled.div`
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: ${({ color }) => color};
  margin-right: 8px;
  position: relative;
  top: -1px;
`

const Skull = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 8px;
  position: relative;
  top: -1px;
`

const Group = styled.div`
  background: #eee;
  margin-top: 10px;
  border-radius: 4px;

  :first-child {
    margin-top: 0;
  }
`

interface PlayerProps {
  opacity: number
}
const Player = styled.div<PlayerProps>`
  display: flex;
  align-items: center;
  padding: 10px 14px;
  opacity: ${({ opacity }) => opacity};

  p {
    font-weight: 500;

    :last-child {
      margin-left: auto;
    }
  }
`

const Leaderboard = observer(() => {
  if (!store.players.length) return null

  const groups = getPlayerGroups(store.players)

  return (
    <Container>
      <Header
        text="Players"
        iconSrc="/static/icons/crown.svg"
        iconSize="24px"
      />
      <Content>
        {groups.map((group, index) => (
          <Group key={index}>
            {group.players.map(player => (
              <Player key={player.id} opacity={player.alive ? 1 : 0.5}>
                {player.alive ? (
                  <Pattern color={player.pattern} />
                ) : (
                  <Skull src="/static/icons/skull.svg" />
                )}

                <p>{player.name}</p>
                <p>{player.alive ? player.tilesCount : '-'}</p>
              </Player>
            ))}
          </Group>
        ))}
      </Content>
    </Container>
  )
})

export default Leaderboard
