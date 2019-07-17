import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import store from '../../../store'
import React from 'react'
import { HUD_SCALE, COLOR } from '../../../constants/react'

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: ${COLOR.HUD_BACKGROUND};
  z-index: 999;
  padding: 0 16px;
  text-align: center;
  border-left: 1px solid ${COLOR.HUD_BORDER};
  border-bottom: 1px solid ${COLOR.HUD_BORDER};
  border-bottom-left-radius: 8px;

  /* Resolution scaling */
  transform-origin: right top;
  transform: scale(${HUD_SCALE});
`

const Label = styled.p`
  font-weight: 500;
  font-size: 12px;
  color: #ccc;
  margin-top: 12px;
`

const Value = styled.p`
  margin-bottom: 12px;
  color: #fff;
`

const Performance = () => (
  <Container>
    <div>
      <Label>FPS</Label>
      <Value>{store.fps}</Value>
    </div>
    {/*<div>*/}
    {/*  <Label>PING</Label>*/}
    {/*  <Value>{store.ping}</Value>*/}
    {/*</div>*/}
  </Container>
)

export default observer(Performance)
