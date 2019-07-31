import styled from 'styled-components'
import Heading from './Heading'
import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import store from '../../store'
import Spinner from '../../components/Spinner'
import Socket from '../../websockets/Socket'
import formatTime from '../../utils/formatTime'
import { Link } from 'react-router-dom'
import randomItem from '../../utils/randomItem'
import RunningGame from '../../types/RunningGame'
import shadeColor from '../../utils/shade'

const Container = styled.div``

const TimesWrapper = styled.div`
  background: #222;
  width: 190px;
  padding: 12px 20px;
  border-radius: 4px;
  border: 1px solid #111;
  display: flex;
  justify-content: space-between;
`

const Row = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
`

const Time = styled.p`
  text-align: right;
  color: #fff;
  font-weight: 300;
`

const Label = styled.p`
  text-align: right;
  font-weight: 500;
`

const StyledSpinner = styled(Spinner)`
  margin-left: 20px;

  /* @media (max-width: 1370px) {
    display: none;
  } */
`

const CancelButton = styled.div`
  background: #333;
  border-radius: 4px;
  padding: 6px 0;
  margin-top: 8px;
  border: 1px solid #111;
  width: 190px;
  display: flex;
  font-size: 14px;
  align-items: center;
  padding-left: 20px;

  > img {
    height: 12px;
    margin-right: 12px;
    filter: invert(1);
  }

  :hover {
    background: #2f2f2f;
  }
`

const SpectateButton = styled.div<{ disabled?: boolean }>`
  margin-top: 8px;
  width: 190px;
  display: flex;
  background: ${props => (props.disabled ? '#444' : '#c23616')};
  color: #fff;
  font-weight: 500;
  font-size: 14px;
  align-items: center;
  border-radius: 4px;
  text-align: center;
  padding: 6px 0;
  border: 1px solid #111;
  padding-left: 16px;
  opacity: ${props => (props.disabled ? 0.4 : 1)};

  > img {
    height: 20px;
    margin-right: 8px;
    filter: invert(1);
  }

  :hover {
    background: ${props =>
      !props.disabled ? shadeColor('#c23616', -15) : null};
  }
`

const WaitingSection = () => {
  const [runningGame, setRunningGame] = useState<RunningGame | null>(null)

  if (!store.waitingTime) return null

  const { current, average, players } = store.waitingTime

  useEffect(() => {
    setRunningGame(randomItem(store.runningGames))
  }, [store.runningGames])

  const cancelQueue = () => {
    Socket.send('cancelQueue')
  }

  return (
    <Container>
      <Heading>Finding match</Heading>

      <Row>
        <TimesWrapper>
          <div>
            <Label>Current:</Label>
            <Label>Estimated:</Label>
            <Label>Players:</Label>
          </div>
          <div>
            <Time>{formatTime(current)}</Time>
            <Time>{average ? formatTime(average) : '-'}</Time>
            <Time>{players || '-'}</Time>
          </div>
        </TimesWrapper>

        {/* <StyledSpinner size="64px" thickness="1px" color="#111" /> */}
      </Row>

      {runningGame ? (
        <Link to={`/spectate?game=${runningGame.id}`}>
          <SpectateButton>
            <img src="/static/icons/spectate.svg" />
            <p>Spectate</p>
          </SpectateButton>
        </Link>
      ) : (
        <SpectateButton disabled>
          <img src="/static/icons/spectate.svg" />
          <p>Spectate</p>
        </SpectateButton>
      )}
      <CancelButton onClick={cancelQueue}>
        <img src="/static/icons/cross.svg" />
        <p>Cancel</p>
      </CancelButton>
    </Container>
  )
}

export default observer(WaitingSection)
