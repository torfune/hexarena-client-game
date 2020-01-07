import styled from 'styled-components'
import React from 'react'
import { COLOR } from '../constants/react'
import { observer } from 'mobx-react-lite'
import store from '../store'

const Container = styled.div<{ spectating: boolean }>`
  background: ${COLOR.HUD_BACKGROUND};
  width: 90px;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: 8px;
  border-bottom: 1px solid ${COLOR.HUD_BORDER};
  border-left: 1px solid ${COLOR.HUD_BORDER};
  padding-top: 6px;
  padding-bottom: 6px;

  /* Resolution scaling */
  transform-origin: right top;
  transform: scale(${store.hudScale});
`

const Icon = styled.img`
  height: 36px;
  filter: invert(1);
`

const Number = styled.div`
  text-align: center;
  color: #fff;
  font-size: 32px;
`

const Spectators = () => {
  if (!store.game || !store.game.spectators) return null

  return (
    <Container spectating={store.spectating}>
      <Icon src="/static/icons/spectate.svg" />
      <Number>{store.game.spectators}</Number>
    </Container>
  )
}

export default observer(Spectators)
