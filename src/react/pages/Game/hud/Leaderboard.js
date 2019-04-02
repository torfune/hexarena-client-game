import React from 'react'
import styled from 'styled-components'
import Header from '../../../shared/Header'
import crownImagePath from '../../../../assets/icons/crown.svg'
import skullImagePath from '../../../../assets/icons/skull.svg'

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
`

const Content = styled.div`
  padding: 8px 30px;
`

const Player = styled.div`
  display: flex;
`

const Pattern = styled.div`
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: ${({ pattern }) => pattern};
  align-self: center;
  margin-right: 8px;
  position: relative;
  top: -1px;
`

const Scull = styled.img`
  height: 16px;
  width: 16px;
  opacity: 0.8;
  align-self: center;
  margin-right: 8px;
  position: relative;
  top: -1px;
`

const Name = styled.p`
  color: #222;
  font-weight: 500;
  margin: 8px 0;
  padding-right: 18px;
`

const TilesCount = styled.p`
  color: #222;
  font-weight: 500;
  width: 18px;
  margin: 8px 0 8px auto;
`

const Leaderboard = ({ leaders, deadPlayers }) => {
  if (!leaders.length) return null

  leaders.sort((a, b) => {
    if (a.tilesCount > b.tilesCount) {
      return -1
    } else if (a.tilesCount < b.tilesCount) {
      return 1
    } else {
      return 0
    }
  })

  // leaders = [
  //   {
  //     name: 'asadsad',
  //     pattern: '#f33',
  //     tilesCount: 33,
  //   },
  //   {
  //     name: 'asadsad',
  //     pattern: '#f33',
  //     tilesCount: 33,
  //   },
  //   {
  //     name: 'asadsad',
  //     pattern: '#f33',
  //     tilesCount: 33,
  //   },
  //   {
  //     name: 'asadsad',
  //     pattern: '#f33',
  //     tilesCount: 33,
  //   },
  //   {
  //     name: 'asadsad',
  //     pattern: '#f33',
  //     tilesCount: 33,
  //   },
  //   {
  //     name: 'asadsad',
  //     pattern: '#f33',
  //     tilesCount: 33,
  //   },
  // ]

  return (
    <Container>
      <Header text="Players" iconSrc={crownImagePath} iconSize="24px" />
      <Content>
        {leaders.map((l, i) => (
          <Player key={i}>
            <Pattern pattern={l.pattern} />
            <Name>{l.name}</Name>
            <TilesCount>{l.tilesCount}</TilesCount>
          </Player>
        ))}
        {deadPlayers.map((d, i) => (
          <Player key={i}>
            <Scull src={skullImagePath} />
            <Name>{d.name}</Name>
            <TilesCount>0</TilesCount>
          </Player>
        ))}
      </Content>
    </Container>
  )
}

export default Leaderboard
