import React from 'react'
import styled from 'styled-components'
import { navigate } from '@reach/router'

import Logo from './components/Logo'
import ReleaseNotes from './components/ReleaseNotes'
import PlaySection from './components/PlaySection'
import Footer from './components/Footer'
import { GAMESERVER_URL } from '../../config'
import axios from 'axios'

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  background: #333;
  padding-top: 64px;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 72px 0px rgba(0, 0, 0, 0.5);
`

class HomePage extends React.Component {
  interval = null
  state = {
    disabledUntil: null,
    countdownTime: null,
    winners: null,
  }
  componentDidMount = async () => {
    const statusRes = await axios.get(`${GAMESERVER_URL}/status`)
    const winnersRes = await axios.get(`${GAMESERVER_URL}/winners`)

    const winners = winnersRes.data
      .split('\n')
      .filter(l => l !== '')
      .reverse()
    this.setState({ winners })

    const disabledUntil = statusRes.data.disabledUntil

    if (disabledUntil) {
      const now = Date.now()

      if (disabledUntil > now) {
        this.setState({ disabledUntil })
        this.interval = setInterval(this.updateCountdown, 100)
      } else {
        this.setState({ disabledUntil: false })
      }
    } else {
      this.setState({ disabledUntil: false })
    }

    document.addEventListener('keydown', this.handleKeyDown)
  }
  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.handleKeyDown)
  }
  handleKeyDown = ({ key }) => {
    if (this.state.disabledUntil !== false) return

    if (key === 'Enter') {
      navigate('game')
    }
  }
  updateCountdown = () => {
    const { disabledUntil } = this.state

    const now = Date.now()

    if (now >= disabledUntil) {
      this.setState({ disabledUntil: false })
      clearInterval(this.interval)
      this.interval = null
    } else {
      this.setState({ countdownTime: disabledUntil - now })
    }
  }
  render() {
    const { disabledUntil, countdownTime, winners } = this.state

    return (
      <Container>
        <Logo />
        <PlaySection
          disabledUntil={disabledUntil}
          countdownTime={countdownTime}
          winners={winners}
        />
        <ReleaseNotes />
        <Footer />
      </Container>
    )
  }
}

export default HomePage
