import React from 'react'
import styled from 'styled-components'

import { LOGO_SHADOW, PRIMARY } from '../../../constants'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 128px;

  h1,
  h2 {
    color: #fff;
    margin: 0;
  }

  h1 {
    font-weight: 700;
    font-size: 64px;
    text-shadow: ${LOGO_SHADOW};
    position: relative;
  }

  h2 {
    margin-top: 6px;
    font-size: 36px;
    font-weight: 200;
  }
`

const Badge = styled.div`
  background: ${PRIMARY};
  font-size: 14px;
  padding: 4px 0;
  border-radius: 50px;
  font-weight: 500;
  position: absolute;
  right: 0;
  width: 80px;
  margin-left: auto;
  text-align: center;
`

const Logo = () => (
  <Container>
    <h1>
      Hexagor.io
      <Badge>Alpha</Badge>
    </h1>

    <h2>Multiplayer strategy game</h2>
  </Container>
)

export default Logo
