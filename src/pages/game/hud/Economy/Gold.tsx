import React from 'react'
import styled from 'styled-components'
import Label from './Label'
import { observer } from 'mobx-react-lite'
import store from '../../../../store'

const Container = styled.div`
  border-left: 1px solid #ddd;
  padding: 16px 20px 8px 20px;
  text-align: right;
  width: 130px;
`

const Value = styled.p`
  font-size: 48px;
  letter-spacing: 2px;
  font-weight: 500;
`

const Gold = () => {
  return (
    <Container>
      <Label>Gold</Label>
      <Value>{store.gold}</Value>
    </Container>
  )
}

export default observer(Gold)
