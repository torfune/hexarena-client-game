import Footer from './Footer'
import Heading from './Heading'
import Logo from './Logo'
import MainSection from './MainSection'
import ReleaseNotes from './ReleaseNotes'
import styled from 'styled-components'
import TopPlayers from './TopPlayers'
import Community from './Community'
import { MIN_SCREEN_WIDTH } from '../../constants/react'

const Container = styled.div`
  width: ${MIN_SCREEN_WIDTH}px;
  margin: 0 auto;
  background: #333;
  padding-top: 64px;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 72px 0px rgba(0, 0, 0, 0.5);
`

const Header = styled.div`
  display: flex;
  padding: 0 128px;
  justify-content: space-between;
  align-items: center;
`

const Description = styled.h2`
  color: #fff;
  font-weight: 300;
  font-size: 32px;
  margin-top: 16px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 96px 128px;
  grid-gap: 64px;
`

const GameScreenshot = styled.div`
  background: url('/static/images/screenshot.png');
  background-position-x: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: -1;
`

const BlackOverlay = styled.div`
  background: #000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  opacity: 0.6;
`

const HomePage = () => {
  return (
    <Container>
      <Header>
        <Logo />
        <Description>Multiplayer strategy game</Description>
      </Header>

      <MainSection />

      <Grid>
        <div>
          <Community />
          <ReleaseNotes />
        </div>
        <div>
          <Heading>Top 20 players</Heading>
          <TopPlayers />
        </div>
      </Grid>

      <Footer />
      <GameScreenshot />
      <BlackOverlay />
    </Container>
  )
}

export default HomePage
