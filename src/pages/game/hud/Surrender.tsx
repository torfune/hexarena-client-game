import styled from 'styled-components'
import React from 'react'
import { HUD_SCALE, PRIMARY } from '../../../constants/react'
import store from '../../../store'

const Container = styled.div`
  background: rgba(255, 255, 255, 0.92);
  top: 0;
  left: 0;
  width: 280px;
  position: absolute;
  user-select: none;
  border-bottom-right-radius: 8px;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  overflow: hidden;
  padding-top: 16px;

  /* Resolution scaling */
  transform-origin: right bottom;
  transform: scale(${HUD_SCALE});
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`

const Icon = styled.img`
  height: 22px;
  opacity: 0.8;
  margin-left: auto;
  margin-right: 24px;
`

const Heading = styled.p`
  text-transform: uppercase;
  margin-bottom: 12px;
  margin-left: 24px;
  font-weight: 600;
  color: #444;
  font-size: 16px;
`

const Button = styled.div`
  background: #666;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  padding: 8px 64px;
  border-radius: 2px;
  margin-top: 32px;
  margin-bottom: 16px;
  margin-left: 24px;
  margin-right: 24px;
  text-align: center;

  :hover {
    background: ${PRIMARY};
  }
`

const Surrender = () => (
  <Container>
    <Row>
      <Heading>lost game ?</Heading>
      <Icon src="/static/icons/flag.svg" />
    </Row>
    <Button onClick={store.game.surrender.bind(store.game)}>Surrender</Button>
  </Container>
)

export default Surrender
