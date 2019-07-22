import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import store from '../../../store'
import React from 'react'
import { HUD_SCALE, CHAT_WIDTH, COLOR } from '../../../constants/react'

const Container = styled.div<{ spectating: boolean }>`
  position: absolute;
  top: ${props => (props.spectating ? '80px' : 0)};
  left: 0;
  width: ${props =>
    props.spectating ? `calc(100vw - ${CHAT_WIDTH})` : '100vw'};
`

const Content = styled.div`
  margin: 0 auto;
  background: ${COLOR.HUD_BACKGROUND};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 1px solid ${COLOR.HUD_BORDER};
  border-top: none;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  padding: 4px 0;
  text-align: center;
  user-select: none;
  width: 128px;

  /* Resolution scaling */
  transform-origin: center top;
  transform: scale(${HUD_SCALE});
`

const GameTime = observer(() => {
  if (!store.game || store.game.time === null) return null

  const minutes = Math.floor(store.game.time / 60)
  const seconds = store.game.time - minutes * 60
  const formatted = {
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  }

  return (
    <Container spectating={store.spectating}>
      <Content>
        {formatted.minutes}:{formatted.seconds}
      </Content>
    </Container>
  )
})

export default GameTime
